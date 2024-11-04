# 理解tcp重传和乱序

TCP协议并没有提供一个单独的标志位来标识一个数据包是否是重传数据包，或者是Keep-Alive数据包。但是我们能够看到Wireshark能够识别出重传的数据包，
通常会给出提示`[TCP Retransmission]`、`[TCP Out-Of-Order]`或者`[TCP Dup ACK]`，也能识别出Keep-Alive数据包和Keep-Alive应答数据包，通常会给出提示
`[TCP Keep-Alive]`或者`[TCP Keep-Alive ACK]`。

ChatTCP是怎么做到能够识别出重传数据包和Keep-Alive数据包的呢？

![Wireshark TCP Retransmission - TCP Dup ACK - TCP Out-Of-Order](/images/tcp-packet-retransmission-and-out-of-order/wireshark-tcp-retransmission.webp)

![Wireshark TCP Keep-Alive - TCP Keep-Alive ACK](/images/tcp-packet-retransmission-and-out-of-order/wireshark-keep-alive.webp)

## 如何识别一个数据包是重传数据包？

如果一个数据包之前已经出现过，那么这个数据包就是重复数据包，也就是重传数据包。

怎么样算重复的TCP数据包呢？具有相同的序列号(seq)、确认号(ack)、以及相同的Payload、相同的标志位，那么就可以认为这是一个重传的数据包。

为什么时间不算？因为TCP协议没有时间！

另外：
* 如果存在SYN标志位，那么这还是一个重传的握手数据包。
* 如果存在FIN标志位，那么这还是一个重传的挥手数据包。
* 如果存在ACK标志位，且该数据包应答的是一个握手数据包（对应待应答的数据包存在SYN标志位），那么这还是一个重传的应答握手的数据包。
* 如果存在ACK标志位，且Payload为空，那么这还是一个重传的应答数据包。
* 如果存在ACK标志位，且Payload不为空，那么这是一个重传的数据数据包。

还有不是重复数据包，但也是重传数据包的两种情况：

1. 可能从第三次握手的数据包开始，服务端就不能正常接收到客户端的数据包，也就是握手实际在服务端没有完成。如果不存在需要应答的数据包或者已经应答过了，且只有ACK标志位，且Payload为空，那么就是重传的握手应答数据包。
2. 因为seq变了（通常是+1），所以不满足重复。如果没找到需要应答的数据包或者已经应答过了，且具有相同的确认号(ack)、以及Payload为空、仅有ACK标志位，且这不是一个Keep-Alive数据包，且窗口大小也没有更新，那么就是重传的应答数据包。

## 如何识别一个数据包是Keep-Alive数据包？

如果不存在需要应答的数据包或者已经应答过了，且数据包只有ACK标志位，且Payload为空，那么再满足下面两个条件其中之一就是一个Keep-Alive数据包了：
* 与自己发送的前一个数据包的发送时间间隔5秒以上。这是区分是否是重传数据包还是Keep-Alive数据包的关键，因为Keep-Alive的时间通常不会小于5秒。
* 与自己发送的前一个数据包的seq相等，并且前一个数据包是一个Keep-Alive数据包。

如果存在需要应答的数据包，对应待应答的数据包是一个Keep-Alive数据包，那么这个数据包就是一个Keep-Alive应答数据包（回复Keep-Alive的数据包）。
Keep-Alive应答数据包不会出现重传情况，因为Keep-Alive应答数据包不需要等待对方回应。
