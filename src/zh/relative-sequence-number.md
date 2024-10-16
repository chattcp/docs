# 配置使用相对序列号

使用过Wireshark的用户，在使用ChatTCP的过程中可能会有这样的疑惑，为什么同一个pcap文件，用ChatTCP和用Wireshark显示的序列号不一样？

因为Wireshark显示的是相对序列号，而不是真实的序列号。ChatTCP默认显示的是真实的序列号，从数据包解码出来的序列号。

当然，由于序列号的开始值是随机的，通常这个值很大，不利于我们分析。因此ChatTCP也提供显示相对序列号的支持，如果有需要，我们可以打开这个配置。

![Setting use relative sequence number](/images/relative-sequence-neumber/setting.png)

需要注意，配置更改后，重新打开文件或者重启ChatTCP配置才会生效。
