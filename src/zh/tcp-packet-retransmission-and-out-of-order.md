# 理解tcp重传和乱序

TCP协议并没有提供一个单独的标志位来标识一个数据包是否是重传数据包、乱序数据包，或者是Keep-Alive数据包。但是我们能够看到Wireshark能识别出哪些数据包是重传、乱序或Keep-Alive数据包，通常会给出提示`[TCP Retransmission]`、`[TCP Out-Of-Order]`或`[TCP Dup ACK]`，也能识别出Keep-Alive数据包和Keep-Alive应答数据包，通常会给出提示 `[TCP Keep-Alive]`或者`[TCP Keep-Alive ACK]`。

[ChatTCP](https://chattcp.com)是一款能让查看网络数据包变得像阅读聊天记录一样简单的工具。作为一个能够简化TCP数据包查看和分析的工具，当然也必须能够像Wireshark那样识别出`[TCP Retransmission]`、`[TCP Out-Of-Order]`、`[TCP Dup ACK]`、`[TCP Keep-Alive]`以及`[TCP Keep-Alive ACK]`数据包。那么我们是怎么识别的呢？

## 如何识别一个数据包是重传或乱序数据包？

![Wireshark TCP Retransmission - TCP Dup ACK - TCP Out-Of-Order](/images/tcp-packet-retransmission-and-out-of-order/wireshark-tcp-retransmission.webp)

为了分析重传和乱序，我们需要关注**同一个方向**（例如，所有从客户端发往服务端的数据包）的数据流。将这些数据包按照抓包时间排序后进行分析：
* 重传：如果一个数据包之前已经出现过，那么这个数据包就是**重复**的数据包，也就是重传数据包。
* 乱序：如果一个数据包的序列号比它前面的一个数据包还小，那就是乱序。`[TCP Out-Of-Order]`

乱序很容易理解，判断序列号(seq)是否是有序的就可以，而重传的判断就比较复杂。

要判断一个数据包是否重传其实就是判断这个数据包是否是一个**重复**的数据包，那么怎么样才算**重复**的TCP数据包呢？

当两个数据包具有相同的序列号(seq)、确认号(ack)、以及相同Payload和标志位(flags)时，那么就可以确认这是一个**重复**的数据包。

序列号和确认号相同，Payload就一定相同（或Payload都是空），所以也可以简化为：当两个数据包具有相同的序列号、确认号、以及相同标志位时，那么就可以确认这是一个**重复**的数据包。

为什么标志位也要相同才算**重复**？

因为序列号、确认号相同，而标志位不同时，可能一个是纯应答数据包，另一个是挥手+应答数据包：（行为不同）
```
seq=1000, ack=3000, Flags=ACK 
seq=1000, ack=3000, Flags=FIN、ACK
```

怎么进一步区分是`[TCP Retransmission]`还是`[TCP Dup ACK]`呢，这就需要通过标志位判断了，一个重传数据包，如果存在ACK标志位并且不是发送数据（Payload为空）基本可以判定为`[TCP Dup ACK]`。

在ChatTCP中，我们还会进一步判断重传数据包的细分类型：
-   如果存在SYN标志位，那么这是一个重传的握手数据包。`[TCP Retransmission]`
-   如果存在FIN标志位，那么这是一个重传的挥手数据包。`[TCP Retransmission]`
-   如果存在ACK标志位，且该数据包应答的是一个握手数据包（对应待应答的数据包存在SYN标志位），那么这是一个重传的应答握手的数据包。`[TCP Dup ACK]`
-   如果存在ACK标志位，且Payload为空，那么这是一个重传的应答数据包。`[TCP Dup ACK]`
-   如果存在ACK标志位，且Payload不为空，那么这是一个重传的数据数据包。`[TCP Retransmission]`

## 如何识别一个数据包是Keep-Alive数据包？

![Wireshark TCP Keep-Alive - TCP Keep-Alive ACK](/images/tcp-packet-retransmission-and-out-of-order/wireshark-keep-alive.webp)

Wireshark判断的条件是：
- 只含ACK标识位
- Payload大小为0或1
- seq等于本端下一个待发送序列号减1

那怎么区分`[TCP Keep-Alive]`和`[TCP Keep-Alive ACK]`呢？

如果对应待应答的数据包是一个Keep-Alive数据包，那么这个数据包就是一个Keep-Alive应答数据包（`[TCP Keep-Alive ACK]`）。 

Keep-Alive应答数据包不会出现重传情况（没有`[TCP Keep-Alive Retransmission]`），因为Keep-Alive数据包不要求对方一定回复一个应答数据包。
