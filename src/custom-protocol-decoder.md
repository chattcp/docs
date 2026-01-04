# Custom Protocol Decoder

Note: This feature is not yet supported in the current APP and is only available on the web version. It is currently in Beta, and its functionality may be unstable.

## Overview

ChatTCP provides custom decoder functionality through a plugin architecture, allowing users to parse custom protocol packets by writing JavaScript scripts.
Users only need to focus on how to decode the protocol data structure, and the system automatically handles TCP packet fragmentation and reassembly.

## Writing Parser Scripts

Plugins need to implement a `parse()` function that will be called by the system to parse packets.

### Available API Functions

- `remaining()`: Get the number of remaining unread bytes

- **Byte Reading**
  - `readBytes(length)`: Read a byte array of the specified length. If `length` is -1, read all remaining data
  - `peekBytes(length)`: Preview bytes of the specified length without moving the read pointer

- **Integer Reading (Big-Endian)**
  - `readUint8()`: Read a 1-byte unsigned integer
  - `readUint16BE()`: Read a 2-byte unsigned integer (big-endian)
  - `readUint32BE()`: Read a 4-byte unsigned integer (big-endian)
  - `readUint64BE()`: Read an 8-byte unsigned integer (big-endian)

- **Integer Reading (Little-Endian)**
  - `readUint16LE()`: Read a 2-byte unsigned integer (little-endian)
  - `readUint32LE()`: Read a 4-byte unsigned integer (little-endian)
  - `readUint64LE()`: Read an 8-byte unsigned integer (little-endian)

- **Signed Integer Reading**
  - `readInt8()`, `readInt16BE()`, `readInt16LE()`, `readInt32BE()`, `readInt32LE()`, `readInt64BE()`, `readInt64LE()`

- **String Reading**
  - `readString(length)`: Read a string of the specified length
  - `readStringNullTerminated()`: Read a null-terminated string

- **Utility Functions**  
  - `JSON.stringify(obj)`: Convert an object to a JSON string
  - `JSON.parse(str)`: Parse a JSON string into an object

### Return Value

Return value of the `parse()` function:

- **Return `null` or `undefined`**: Indicates that the data is incomplete and cannot be decoded, or the protocol is not supported (in single packet decoding scenarios, the framework will try to use other protocol decoders)
- **Return a data object**: Indicates successful decoding, and the returned object is the parsing result

```javascript
function parse() {
    // Check if there is enough data
    if (remaining() < 4) {
        return null; // Not supported, let the framework try other protocols
    }
    
    // Parsing logic...
    // If more data is needed, directly call readBytes and other functions, the framework will handle it automatically
    var length = readUint32BE();
    var data = readString(length);
    
    // Return the parsing result
    return {
        length: length,
        data: data
    };
}
```

### Error Handling

**Note: Do not throw errors!** If parsing fails, return `null` to let the framework try other protocol analyzers (in single packet decoding scenarios).

## Examples

### Example 1: Simple Length-Prefixed Protocol

Assume the protocol format is: `[4-byte length][data]`

```javascript
function parse() {
    // Check if there is enough data to read the length field
    if (remaining() < 4) {
        return null; // Return null, indicating unable to decode
    }
    
    // Read length (big-endian)
    var length = readUint32BE();
    
    // Check if there is enough data to read the complete message
    if (remaining() < length) {
        return null; // Return null, indicating unable to decode
    }
    
    // Read data
    var data = readString(length);
    
    // Return the parsing result
    return {
        length: length,
        data: data
    };
}
```

### Example 2: Command + Fixed Length + Data

Assume the protocol format is: `[1-byte command][2-byte data length][data]`

```javascript
function parse() {
    // Check minimum length
    if (remaining() < 3) {
        return null;  // Return null, indicating unable to decode
    }
    
    var type = readUint8();
    var dataLength = readUint16BE();
    
    // Check if there is complete data
    if (remaining() < dataLength) {
        return null;  // Return null if data is incomplete, indicating unable to decode
    }
    
    var data = readBytes(dataLength);
    
    return {
        type: type,
        dataLength: dataLength,
        data: Array.from(data).map(b => b.toString(16).padStart(2, '0')).join(' ')
    };
}
```

### Example 3: Magic Number Header Protocol

Assume the protocol format is: `[4-byte magic number 0xDEADBEEF][2-byte length][data]`

```javascript
function parse() {
    // Check if there is enough data to read the magic number
    if (remaining() < 4) {
        return null; // Return null, indicating unable to decode
    }
    
    // Read magic number (big-endian)
    var magic = readUint32BE();
    
    // Check if the magic number matches
    if (magic !== 0xDEADBEEF) {
        return null; // Magic number mismatch, not this protocol, return null to indicate unsupported decoding
    }
    
    // Read length field
    if (remaining() < 2) {
        return null; // Return null if data is incomplete, indicating unable to decode
    }
    var length = readUint16BE();
    
    // Check if there is complete data
    if (remaining() < length) {
        return null; // Return null if data is incomplete, indicating unable to decode
    }
    
    // Read data
    var data = readString(length);
    
    return {
        magic: "0x" + magic.toString(16).toUpperCase(),
        length: length,
        data: data
    };
}
```

## TCP Packet Fragmentation and Reassembly

The system automatically handles TCP packet fragmentation and reassembly:

- **Fragmentation Handling**: In stream analysis mode, when calling `readBytes()` and other functions, if the current packet data is insufficient, the framework will automatically read more data from subsequent packets. Users do not need to handle this manually; just call the read functions directly.
- **Reassembly Handling**: When `parse()` successfully parses a complete packet, the remaining data will automatically be merged to the beginning of the next packet for the next parsing operation.
- **Unsupported Detection**: Returning `null` indicates decoding failure or unsupported protocol.

