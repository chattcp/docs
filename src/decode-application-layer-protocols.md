# Decoding Application Layer Protocols

The application layer is the seventh layer of the OSI model, with commonly used application layer protocols based on TCP such as HTTP and WebSocket.

ChatTCP automatically recognizes the application layer protocol used by the connection and decodes the Payload of each packet using the corresponding application layer protocol, mapping it to the protocol's data structure for intuitive and efficient analysis.

![Decode as websocket](/images/decode-application-layer-protocols/chat-payload-websocket.webp)

Certainly, it is also supported to decode the Payload of all incoming and outgoing packets within the entire connection using the corresponding application layer protocol. ChatTCP will handle issues related to packet sticking and fragmentation. This corresponds to the Flow stream functionality in Wireshark.

![Flow stream](/images/decode-application-layer-protocols/flow-stream-decode-app-layer-protocol.webp)

For less common protocols, such as custom application layer protocols based on TCP used within enterprises, you can also use JavaScript to implement custom protocol decoders based on the plugin functionality provided by ChatTCP.

ChatTCP currently supports the following application layer protocols: HTTP, WebSocket, Redis, MySQL, and DNS.
