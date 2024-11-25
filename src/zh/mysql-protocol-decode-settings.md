# Mysql协议解码配置

ChatTCP 2.6版本开始支持Mysql协议解码，与Wireshark实现类似，需要我们配置Mysql服务器的端口号才能正确解码Mysql协议数据，
默认为3306端口。如果我们抓包的Mysql服务器的端口号不是3306，就需要我们修改"Mysql protocol port"这个配置项，改为正确的端口号，
才能正确解码Mysql协议数据。

![Mysql protocol port setting | ChatTCP](/images/mysql-protocol-decode-settings/mysql-protocol-port-setting.webp)

那么，为什么一定要配置一个端口号才能正确解码Mysql协议呢？

由于Mysql协议的特殊性，客户端和服务器协议编码并不像WebSocket协议那样都是使用统一的数据结构，也不像HTTP协议那样，
有明显的Start Line区分，ChatTCP解码Mysql协议时，只能根据目标端口号来识别是Mysql客户端，还是Mysql服务器发送的数据包。

 

