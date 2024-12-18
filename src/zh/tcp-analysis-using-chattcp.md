# 使用ChatTCP分析TCP数据包

您已经下载ChatTCP了吗？如果还没下载，可以点击此链接去下载：[chattcp.com](https://chattcp.com)

在开始之前，我们需要先准备一个pcap（或pcapng）文件，也就是抓包文件。
如果您忘记tcpdump命令如何写，ChatTCP提供了一个小工具：[使用ChatTCP生成tcpdump命令](/zh/generate-tcpdump-command-using-chattcp)

> PS：您看到的所有图片都是英文版的截图，ChatTCP支持中文，当您的系统使用中文时，ChatTCP就会使用中文。

## 选择一个文件打开

打开ChatTCP，点击“点击选择一个文件开始”，选择一个pcap文件打开。

![Click to select file](/images/tcp-analysis-using-chattcp/click-to-select-file.webp)

如果您目前是在学习，并且还未抓取数据包，可以查看ChatTCP提供的一些经典案例，您可阅读此文档：[经典案例](/zh/classic-case)

## 分析窗口介绍

当我们选择一个文件打开后，会打开一个分析窗口。该窗口分为左、中、右三个工作区。

![Analysis window](/images/tcp-analysis-using-chattcp/analysis-window.webp)

### 左侧工作区

该区域显示分析统计、以及分析出的所有TCP连接。

![Filter stream](/images/tcp-analysis-using-chattcp/analysis-left-workspace.webp)

* 分析统计：统计该文件分析的结果，一共有多少个连接、有多少个未完成三次握手的连接、有多少个出现重传数据包的连接等。
* TCP连接列表：列出了所有TCP连接，支持模糊搜索过滤连接。

### 中间工作区

该区域就是我们分析一个TCP连接所有往返数据包的区域，以聊天对话的方式按数据包发送顺序显示，每个Chat就是一个TCP数据包。

当我们在左侧工作区选中一个连接时，该区域就会更新显示为该连接的“聊天记录”。

![Chat window](/images/tcp-analysis-using-chattcp/analysis-main-workspace.webp)

一个Chat包括：发送者IP:PORT、该数据包发送之后连接所处状态、数据包发送时间、seq、ack、标志位、Payload（如有）、备注。

![One chat](/images/tcp-analysis-using-chattcp/chat-struct.webp)

如果你忘记了标志位是什么意思，可以将鼠标移动到标志位，就是弹出提示。

![Flag tips](/images/tcp-analysis-using-chattcp/chat-tcp-flag-tips.webp)

如果你不懂怎么理解这个TCP数据包，可开启“Commentary”，ChatTCP就会显示教你如何理解该数据包。

![Commentary](/images/tcp-analysis-using-chattcp/chat-commentary.webp)

如果你想了解整个TCP数据包，我们可以点击“i”按钮，此时就是在底部弹出一个视图来显示这个数据包的明细。

![TCP Structure](/images/tcp-analysis-using-chattcp/tcp-structure.webp)

默认会将数据包映射到TCP数据结构显示，另外还支持十六进制查看模式。

![TCP Structure Hex](/images/tcp-analysis-using-chattcp/tcp-structure-hex.webp)

当我们点击弹出视图之外的地方，弹出视图就会消失。

ChatTCP会自动识别数据包Payload使用的应用层协议并解码，如果解码成功，那么Chat会以应用层协议数据结构显示。

![Chat payload decode as websocket](/images/tcp-analysis-using-chattcp/chat-payload-websocket.webp)

### 右侧工作区

该区域显示当前所选连接的诊断分析，例如网络延迟情况、重传情况。

![Diagnostic analysis](/images/tcp-analysis-using-chattcp/analysis-right-workspace.webp)
