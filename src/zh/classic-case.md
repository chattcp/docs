# TCP抓包分析经典案例

ChatTCP为用户提供了一些非常经典的TCP协议学习案例，例如TCP协议的三次握手和四次挥手等，用户无需自己抓包，非常适合新手用于学习掌握TCP协议。
除了TCP协议，ChatTCP后续也会逐渐提供一些应用层协议的案例，例如websocket协议，方便用户用于学习或复习，无需自己模拟场景和抓包。

> PS：您看到的所有图片都是英文版的截图，ChatTCP支持中文，当您的系统使用中文时，ChatTCP就会使用中文。

![Classic case](/images/classic-case/classic-cases.png)

当前提供的案例有：
* TCP协议的三次握手和四次挥手案例，四次挥手的第二次和第三次是同一个数据包
* TCP协议Keep-Alive数据包学习案例，了解Keep-Alive数据包长什么样
* 经典案例：三次握手第三次握手服务端未接收到会怎么样？
* TCP协议四次挥手四个数据包的案例
* http协议客户端请求传参某个请求头的值多了个'\n'导致服务端无法正常处理请求
* 通过TCP抓包分析，解决http event stream一直卡到最后一个消息才一次性返回的问题
* WebSocket协议学习案例(用于体验ChatTCP提供的应用层WebSocket协议解码功能)
* HTTP图片下载案例(用于体验"提取导出HTTP协议传输的文件"功能)
