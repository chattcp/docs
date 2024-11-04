# ChatTCP的高级搜索功能

ChatTCP为了简化分析过程，会解析出pcap（或pcapng）文件中所有的连接，按连接将往返数据包重组，构建成聊天记录显示。
因此ChatTCP默认只支持按连接过滤，支持模糊搜索。

但在实际使用过程中，pcap文件可能很大，解析出的连接很多，或者单个连接的往返数据包也很多，这时候如果想找到Payload含有某个字符串的数据包，按连接一个个找就非常困难了。
为了解决这个问题，ChatTCP提供高级搜索功能，支持按TCP标志位、Payload等条件全局搜索数据包。同样的，我们也并不需要像Wireshark那样记过滤表达式怎么写。

![Advanced search](/images/search-package/advanced-search.webp)

ChatTCP搜索功能还支持根据应用层协议设置检索条件，例如当我们选择HTTP协议时，输入条件就变成http协议的数据结构的可检索字段。

![Http protocol search](/images/search-package/http-search-condtion.webp)