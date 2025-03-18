# 导出HTTP协议传输的文件

该功能支持我们导出抓包文件中使用http协议传输的文件，例如图片、二进制文件。

已支持导出使用http range传输和使用gzip压缩传输的文件，但不支持sse+gzip传输场景，因为正常使用sse不应该开启http的gzip压缩。

## 如何使用

ChatTCP会自动分析识别出所有使用http协议传输的文件，如果能识别出文件，我们就能在左侧工作区底部看到浮窗。
点击"导出"案例就会弹出文件列表窗口，选择需要导出的文件点击导出即可将文件导出存储到本地磁盘。

![How to export files transferred via HTTP protocol in a pcap file - ChatTCP](/images/extract-http-protocol-files/export-http-file.webp)

文件列表可以看到文件名（通常取url）、文件类型（Content-Type）、文件大小。如果文件不完整，文件大小后面会显示一个警告符号。

