# Classic case of TCP packet capture analysis

ChatTCP provides users with some classic learning cases for the TCP, such as the three-way handshake and four-way handshake of the TCP, allowing users to learn and master the TCP without needing to capture packets themselves. It is very suitable for beginners.

In addition to the TCP, ChatTCP will gradually provide cases for application layer protocols, such as the WebSocket protocol, to facilitate users' learning or review without needing to simulate scenarios and capture packets.

![Classic case](/images/classic-case/classic-cases.webp)

## Currently available cases include

### The three-way handshake and four-way handshake cases of the TCP, where the second and third packets of the four-way handshake are the same packet.

This case includes only TCP three-way handshake and four-way wave packets, which is very suitable for beginners to learn and understand the TCP.

In the four-way wave, the second wave and the third wave are the same packet.

Don't four-way waves correspond to four TCP packets? Why are there only three in this case?

Generally, they correspond to four packets, but there are cases with three packets. The reason is that the second wave is the passive side's reply ACK, indicating that the closure request has been received, and the third wave is the passive side sending FIN to the active side, indicating that it is also ready to close the connection. So the third wave FIN can be combined with the second wave ACK packet and sent together.

### Learning case for TCP Keep-Alive packets, to understand what Keep-Alive packets look like.

Do you know what Keep-Alive packets look like?

If you don't know yet, this case can help you understand Keep-Alive packets.

In this case, the Keep-Alive interval is 15 seconds. This is a packet capture from a Go program, and the default KeepAlive timeout for Go's underlying net.Dialer is 15 seconds. If interested, you can check out this issue, which says that Go's default 15-second KeepAlive is too frequent, leading to battery drain.

### What happens if the server does not receive the third handshake of the three-way handshake?

This case is suitable for understanding why TCP needs three-way handshake and is also a very typical trouble shooting case.

In this case, since the server did not receive the client's third handshake packet, the connection was not actually established successfully. Judging from this case, it should be packet loss on the server side.

The server keeps retransmitting the second handshake packet, and the client receives the server's retransmitted second handshake packet and retransmits the third handshake packet, but the server still does not receive it.

Finally, the client actively sent a disconnection wave packet, the server received the wave packet and replied with a wave acknowledgment, but since the server did not actually establish a connection successfully, the server did not send the third wave but replied with an RST packet.

### Case of the four packets in the TCP protocol's four-way handshake.

This case includes three-way handshake, keep-alive, and four-way wave.

The keep-alive is initiated by the server, which is a Go process, with a default timeout of 15 seconds. After 15 seconds without sending or receiving any packets, the server actively initiated a keep-alive, and the client replied with an ACK upon receiving the keep-alive.

The four-way wave corresponds to four packets, with the server initiating the connection closure (first wave). The client's second wave is an ACK reply to the server's first wave, and the third is the client sending a FIN to the server, indicating that it is also ready to close the connection. In this case, the client did not combine the second and third into one packet.

### An HTTP client request where an extra '\n' in a request header value causes the server to fail to process the request properly.

The value of a certain request header transmitted by the client included a '\n', which caused the server framework to fail in parsing the request correctly. This is because, according to the HTTP, when parsing the request, any content following this '\n' is treated as the request body. However, the Content-Length did not match the length of the body, resulting in an erroneous request. Consequently, the server framework actively disconnected the connection.

### Analyzing TCP packet captures to solve the issue of the HTTP event stream being stuck until the last message is returned all at once.

HTTP Event Stream is used to achieve a typewriter-like effect similar to that of GPT.

In this case, although it uses the HTTP, capturing packets with Charles may not reveal that the event stream is indeed returned in multiple data packets; instead, it may only show the final, complete HTTP response.

Through TCP packet capture and analysis, it was found that each event is responded to in a separate TCP packet. However, from the frontend perspective, there was a significant delay before the content was displayed all at once, failing to achieve the typing effect.

Upon examining the TCP packets, it was discovered that each event was garbled. Since we did not encrypt the data, there was only one possible explanation: compression was enabled.

If compression is enabled, the entire body must be received before it can be decoded. Therefore, the response was held up until the last packet was received, resulting in a single, delayed response.

### WebSocket Protocol Learning Case

An HTTP request-response example for downloading an image file, intended to demonstrate the features of (Exporting files transmitted via the HTTP).

### HTTP Image Download Case

A WebSocket protocol case for learning and mastering the WebSocket protocol, as well as experiencing the application-layer WebSocket protocol decoding features provided by ChatTCP.