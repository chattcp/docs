# 快速开始

您已经下载ChatTCP了吗？如果还没下载，可以点击此链接去下载：[chattcp.com](https://chattcp.com)

在开始之前，我们需要先准备一个pcap（或pcapng）文件，也就是抓包文件。
如果您还不知道怎么抓包，可以先看这个文档：[How to capture tcp packets](/how-to-capture-tcp-packets)

> PS：您看到的所有图片都是英文版的截图，ChatTCP支持中文，当您的系统使用中文时，ChatTCP就会使用中文。

## 选择一个文件打开

打开ChatTCP，点击“点击选择一个文件开始”，选择一个pcap文件打开。

![Click to select file](images/quick-start/click-to-select-file.png)

> PS: 如果您目前是在学习，并且还未抓取数据包，可以查看ChatTCP提供的一些经典案例，您可阅读此文档：[Classic case](/classic-case)

## 分析窗口介绍

当我们选择一个文件打开后，会打开一个分析窗口。该窗口分为左、中、右三个工作区。

![Analysis window](images/quick-start/analysis-window.png)

### 左侧工作区

该区域显示分析统计、以及分析出的所有TCP连接。

![Filter stream](images/quick-start/analysis-left-workspace.png)

* 分析统计：统计该文件分析的结果，一共有多少个连接、有多少个未完成三次握手的连接、有多少个出现重传数据包的连接等。
* TCP连接列表：列出了所有TCP连接，支持模糊搜索过滤连接。

### 中间工作区

该区域就是我们分析一个TCP连接所有往返数据包的区域，以聊天对话的方式按数据包发送顺序显示，每个Chat就是一个TCP数据包。

当我们在左侧工作区选中一个连接时，该区域就会更新显示为该连接的“聊天记录”。

![Chat window](/images/quick-start/analysis-main-workspace.png)

一个Chat包括：发送者IP:PORT、该数据包发送之后连接所处状态、数据包发送时间、seq、ack、标志位、Payload（如有）、说明。

![One chat](/images/quick-start/chat-struct.png)

如果你忘记了标志位是什么意思，可以将鼠标移动到标志位，就是弹出提示。

![Flag tips](/images/quick-start/chat-tcp-flag-tips.png)

如果你不懂怎么理解这个TCP数据包，可开启“Turn on commentary”，ChatTCP就会显示教你如何理解该数据包。

![Commentary](/images/quick-start/chat-commentary.png)

如果你想了解整个TCP数据包，我们可以点击“Show”按钮，此时就是在底部弹出一个视图来显示这个数据包的明细。

![TCP Structure](/images/quick-start/tcp-structure.png)

默认会将数据包映射到TCP数据结构显示，另外还支持十六进制查看模式。

![TCP Structure Hex](/images/quick-start/tcp-structure-hex.png)

当我们点击弹出视图之外的地方，弹出视图就会消失。

ChatTCP会自动识别数据包Payload使用的应用层协议并解码，如果解码成功，那么Chat会以应用层协议数据结构显示，并支持切换到Raw。

![Chat payload decode as websocket](/images/quick-start/chat-payload-websocket.png)

### 右侧工作区

该区域显示当前所选连接的诊断分析，例如网络延迟情况、重传情况。

![Diagnostic analysis](/images/quick-start/analysis-right-workspace.png)
