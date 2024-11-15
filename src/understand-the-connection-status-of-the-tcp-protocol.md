# Understanding the Connection Status of the TCP

In our work, we may encounter issues related to connection status, such as a full half-connection queue. So, what does a full half-connection queue mean, and how do we understand the half-connection status in the TCP?

First, let's understand the various connection states in the TCP and how to interpret them from packet capture analysis.

![TCP connection status](/images/understand-the-connection-status-of-the-tcp-protocol/tcp-connection-status.jpg)

* LISTEN: Indicates that the server is listening for incoming connection requests. When the server is ready to accept connection requests, it is in the listening state.

This is the state when we start a Tomcat service or a Netty service, and the service listens on a port.

* SYN_SENT: Indicates that the client has sent a connection request (SYN) to the server and is waiting for confirmation from the server.

After the client initiates a connection and sends the first handshake packet, it enters this state.

* SYN_RCVD: Indicates that the server has received the client's connection request (SYN) and has sent its own connection request (SYN), waiting for confirmation from the client.

After the server receives the client's first handshake packet and replies with an ACK, it enters this state, which is also called the half-connection state.

* ESTABLISHED: Indicates that both parties have established a connection and can send data to each other.

When the client receives the server's second handshake packet and sends the third handshake packet to the server, the client enters this state. When the server receives the client's third handshake packet, it also enters this state.

* FIN_WAIT_1: Indicates that one end of the connection (usually the client) has sent a close request and is waiting for confirmation from the other end.

The party that actively closes the connection enters this state after sending a FIN packet (the first wave).

* CLOSE_WAIT: Indicates that the passive closing end (usually the server) has completed data transmission and is preparing to close the connection.

The party that passively closes the connection enters this state after receiving a FIN packet (the first wave) and sending an ACK response (the second wave).

* FIN_WAIT_2: Indicates that one end of the connection (usually the client) has received a close request and sent a confirmation, waiting for the other end to close the connection.

The party that actively closes the connection enters this state after receiving the wave acknowledgment.

* LAST_ACK: Indicates that the passive closing end (usually the server) has sent a close request and is waiting for confirmation from the other party.

The party that passively closes the connection enters this state after sending a FIN packet (the third wave).

* TIME_WAIT: Indicates that one end of the connection (usually the client) has sent a close confirmation but may still receive delayed packets, requiring a wait of 2MSL duration.

The party that actively closes the connection enters this state after receiving a FIN packet (the third wave packet) and sending an ACK response (the fourth wave).

* CLOSED: Indicates that the connection has not been established or has been closed. In the closed state, the TCP connection does not exist.
  For the party that actively closes the connection, after waiting in the TIME_WAIT state for 2MSL, the connection changes to the CLOSED state.
  For the party that passively closes the connection, after receiving the wave acknowledgment (the fourth wave packet), the connection changes to the CLOSED state.

A full half-connection queue means that the number of connections in the SYN_RCVD state exceeds the size of the half-connection queue on the server. In Linux systems, the default size of the half-connection queue (backlog) is usually between 128 and 128-511.
If the queue is full, new connection requests will be rejected or delayed. We can modify the size of the half-connection queue in Linux to support larger concurrent connection requests.

For example, you can modify it using the command `sudo sysctl -w net.core.somaxconn=65535`. Alternatively, you can modify it using the command `echo "65535" > /proc/sys/net/ipv4/tcp_max_syn_backlog`.
