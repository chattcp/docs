# 自定义协议解码器

此文档适用于ChatTCP的网页版和APP，以及TCP和UDP。

## 概述

ChatTCP通过插件架构为用户提供自定义解码器功能，允许用户通过编写JavaScript脚本来解析自定义协议数据包。
用户只需要关心如何解码协议数据结构，系统会自动处理TCP的黏包和拆包。

## 编写解析脚本

插件需要实现一个 `parse()` 函数，该函数会被系统调用来解析数据包。

### 可用的API函数

- `remaining()`: 获取剩余未读取的字节数

- **字节读取**
  - `readBytes(length)`: 读取指定长度的字节数组。如果 `length` 为 -1，读取所有剩余数据
  - `peekBytes(length)`: 预览指定长度的字节，但不移动读取指针

- **整数读取（大端序）**
  - `readUint8()`: 读取1字节无符号整数
  - `readUint16BE()`: 读取2字节无符号整数（大端序）
  - `readUint32BE()`: 读取4字节无符号整数（大端序）
  - `readUint64BE()`: 读取8字节无符号整数（大端序）

- **整数读取（小端序）**
  - `readUint16LE()`: 读取2字节无符号整数（小端序）
  - `readUint32LE()`: 读取4字节无符号整数（小端序）
  - `readUint64LE()`: 读取8字节无符号整数（小端序）

- **有符号整数读取**
  - `readInt8()`, `readInt16BE()`, `readInt16LE()`, `readInt32BE()`, `readInt32LE()`, `readInt64BE()`, `readInt64LE()`

- **字符串读取**
  - `readString(length)`: 读取指定长度的字符串
  - `readStringNullTerminated()`: 读取以null结尾的字符串

- **工具函数**  
  - `JSON.stringify(obj)`: 将对象转换为JSON字符串
  - `JSON.parse(str)`: 将JSON字符串解析为对象

### 返回值

`parse()` 函数的返回值：

- **返回 `null` 或 `undefined`**：表示数据不完整无法解码，或不支持这个协议（单数据包解码场景下，框架会尝试使用其他协议解码）
- **返回数据对象**：表示解码成功，返回的对象就是解析结果

```javascript
function parse() {
    // 检查数据是否足够
    if (remaining() < 4) {
        return null; // 不支持，让框架尝试其他协议
    }
    
    // 解析逻辑...
    // 如果需要更多数据，直接调用 readBytes 等函数，框架会自动处理
    var length = readUint32BE();
    var data = readString(length);
    
    // 返回解析结果
    return {
        length: length,
        data: data
    };
}
```

### 错误处理

**注意：不要抛出错误！** 如果无法解析，应该返回 `null`，让框架尝试其他协议分析器（单数据包解码场景）。

## 示例

### 示例1: 简单的长度前缀协议

假设协议格式为：`[4字节长度][数据]`

```javascript
function parse() {
    // 检查是否有足够的数据读取长度字段
    if (remaining() < 4) {
        return null; // 返回null，表示无法解码
    }
    
    // 读取长度（大端序）
    var length = readUint32BE();
    
    // 检查是否有足够的数据读取完整消息
    if (remaining() < length) {
        return null; // 返回null，表示无法解码
    }
    
    // 读取数据
    var data = readString(length);
    
    // 返回解析结果
    return {
        length: length,
        data: data
    };
}
```

### 示例2: 指令+固定长度+数据

假设协议格式为：`[1字节指令][2字节数据长度][数据]`

```javascript
function parse() {
    // 检查最小长度
    if (remaining() < 3) {
        return null;  // 返回null，表示无法解码
    }
    
    var type = readUint8();
    var dataLength = readUint16BE();
    
    // 检查是否有完整数据
    if (remaining() < dataLength) {
        return null;  // 数据不完整也返回null，表示无法解码
    }
    
    var data = readBytes(dataLength);
    
    return {
        type: type,
        dataLength: dataLength,
        data: Array.from(data).map(b => b.toString(16).padStart(2, '0')).join(' ')
    };
}
```

### 示例3: 魔数开头的协议

假设协议格式为：`[4字节魔数 0xDEADBEEF][2字节长度][数据]`

```javascript
function parse() {
    // 检查是否有足够的数据读取魔数
    if (remaining() < 4) {
        return null; // 返回null，表示无法解码
    }
    
    // 读取魔数（大端序）
    var magic = readUint32BE();
    
    // 检查魔数是否匹配
    if (magic !== 0xDEADBEEF) {
        return null; // 魔数不匹配，不是这个协议，返回null表示不支持解码
    }
    
    // 读取长度字段
    if (remaining() < 2) {
        return null; // 数据不完整也返回null，表示无法解码
    }
    var length = readUint16BE();
    
    // 检查是否有完整数据
    if (remaining() < length) {
        return null; // 数据不完整也返回null，表示无法解码
    }
    
    // 读取数据
    var data = readString(length);
    
    return {
        magic: "0x" + magic.toString(16).toUpperCase(),
        length: length,
        data: data
    };
}
```

## TCP黏包和拆包

系统自动处理TCP的黏包和拆包问题：

- **拆包处理**: 在流分析模式下，当调用 `readBytes()` 等函数时如果当前数据包数据不足，框架会自动从后续数据包中读取更多数据。用户无需手动处理，直接调用读取函数即可。
- **黏包处理**: 当 `parse()` 成功解析一个完整的数据包后，剩余的数据会自动合并到下一个数据包的开头，供下次解析使用。
- **不支持判断**: 返回 `null` 表示解码失败或不支持。


