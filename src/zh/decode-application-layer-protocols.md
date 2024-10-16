# 解码应用层协议

应用层即ISO模型的第七层，常用的基于TCP协议的应用层协议如HTTP、WebSocket。

ChatTCP默认会自动识别连接使用的应用层协议，并将每个数据包使用相应的应用层协议来解码Payload，并映射到协议的数据结构显示，分析起来非常直观和高效。

![Decode as websocket](/images/decode-application-layer-protocols/chat-payload-webscoket.png)

当然，也直接将整个连接的所有往返数据包的Payload使用相应的应用层协议解码，ChatTCP会解决粘包和拆包问题。这对应于Wireshark的Flow stream功能。

![Flow stream](images/quick-start/decode-application-layer-protocols/flow-stream-decode-app-layer-protocol.png)

对于非常见的协议，例如企业内部基于TCP协议的自定义应用层协议，您也可以将Payload导出为二进制文件，然后通过自己的协议解码器来解码。
通常您需要过滤是客户端发送的还是服务端发送的分别导出。

ChatTCP目前仅支持http协议和websocket协议，后续ChatTCP也会逐渐添加更多应用层协议，例如一些中间件使用的协议：redis、sql。

