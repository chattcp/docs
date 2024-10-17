# Classic case of TCP packet capture analysis

ChatTCP provides users with some classic learning cases for the TCP protocol, such as the three-way handshake and four-way handshake of the TCP protocol, allowing users to learn and master the TCP protocol without needing to capture packets themselves. It is very suitable for beginners.

In addition to the TCP protocol, ChatTCP will gradually provide cases for application layer protocols, such as the WebSocket protocol, to facilitate users' learning or review without needing to simulate scenarios and capture packets.

![Classic case](/images/classic-case/classic-cases.png)

Currently available cases include:
* The three-way handshake and four-way handshake cases of the TCP protocol, where the second and third packets of the four-way handshake are the same packet.
* Learning case for TCP Keep-Alive packets, to understand what Keep-Alive packets look like.
* Classic case: What happens if the server does not receive the third handshake of the three-way handshake?
* Case of the four packets in the TCP protocol's four-way handshake.
* An HTTP protocol client request where an extra '\n' in a request header value causes the server to fail to process the request properly.
* Analyzing TCP packet captures to solve the issue of the HTTP event stream being stuck until the last message is returned all at once.
