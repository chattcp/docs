# 远程实时抓包分析

为提升网络问题排查工作效率，ChatTCP于5.2版本上线远程实时查看和分析网络数据包功能。

只需要在服务器安装 chattcp-capture 并启动，然后在ChatTCP APP配置访问该服务器的Host(http://ip:port)，选择需要抓取的网络接口、传输层协议，
以及其它过滤条件，就能实时的捕获数据包、实时查看数据包。在APP中可以随时停止抓包，并且可以再次开始抓包而不需要登陆服务器重启抓包程序。

您可以参考在线版的使用教程：[Remote Realtime Packet Capture & Analysis| ChatTCP](https://chattcp.com/zh/remote-capture)

APP与在线版的区别：您电脑上的ChatTCP APP与您服务器上的chattcp-capture进程进行通信， 您的数据完全是私密的，并且支持局域网内通信。
此外，您还可抓取本机网络数据包，只需要在您的电脑上下载chattcp-capture并启动。

chattcp-capture源代码是开源的，您可自己拉取源代码编译，并阅读源码，确保chattcp-capture安全可信。

GitHub仓库地址：[ChatTCP Capture](https://github.com/chattcp/chattcp-capture)

您可以在服务器上使用 curl 下载，以Linux为例：
```shell
# Linux (amd64)
curl -L -o chattcp-capture https://github.com/chattcp/chattcp-capture/releases/latest/download/chattcp-capture-linux-amd64
```
下载后运行：
```shell
# 先给程序赋予可执行权限
chmod +x chattcp-capture
# 需要以root启动，并指定HTTP服务器监听的端口
sudo ./chattcp-capture -port 8080
```

在APP中配置：
![ChatTCP | Remote Realtime Capture](/images/remote-realtime-capture-analysis/remote_realtime_capture.webp)

点击开始，即可实时查看捕获的数据包。点击右下脚的停止按钮可终止抓包。
![ChatTCP | Realtime Capture Analysis](/images/remote-realtime-capture-analysis/realtime_capture_analysis.webp)
