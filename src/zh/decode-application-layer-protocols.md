# 解码应用层协议

应用层即OSI模型的第七层，常用的基于TCP协议的应用层协议如HTTP、WebSocket。

ChatTCP默认会自动识别连接使用的应用层协议，并将每个数据包使用相应的应用层协议来解码Payload，并映射到协议的数据结构显示，分析起来非常直观和高效。

![Decode as WebSocket](/images/decode-application-layer-protocols/chat-payload-websocket.webp)

当然，也支持将整个连接的所有往返数据包的Payload使用相应的应用层协议解码，ChatTCP会解决粘包和拆包问题。这对应于Wireshark的Flow stream功能。

![Flow stream](/images/decode-application-layer-protocols/flow-stream-decode-app-layer-protocol.webp)

对于非常见的协议，例如企业内部基于TCP协议的自定义应用层协议，您也可以基于ChatTCP提供的插件功能，使用JavaScript实现自定义协议解码器。

ChatTCP目前已支持的应用层协议有：HTTP、WebSocket、Redis、MySQL、DNS。

