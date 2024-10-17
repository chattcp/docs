# Understanding TCP Retransmission and Out-of-Order

The TCP protocol does not provide a separate flag to indicate whether a packet is a retransmitted packet or a Keep-Alive packet. However, we can see that Wireshark can identify retransmitted packets, usually providing prompts like `[TCP Retransmission]`, `[TCP Out-Of-Order]`, or `[TCP Dup ACK]`. It can also identify Keep-Alive packets and Keep-Alive acknowledgment packets, typically showing prompts like `[TCP Keep-Alive]` or `[TCP Keep-Alive ACK]`.

How does ChatTCP manage to identify retransmitted packets and Keep-Alive packets?

![Wireshark TCP Retransmission - TCP Dup ACK - TCP Out-Of-Order](/images/tcp-packet-retransmission-and-out-of-order/wireshark-tcp-retransmission.png)

![Wireshark TCP Keep-Alive - TCP Keep-Alive ACK](/images/tcp-packet-retransmission-and-out-of-order/wireshark-keep-alive.png)

## How to Identify a Packet as a Retransmitted Packet?

If a packet has appeared before, then this packet is a duplicate packet, which means it is a retransmitted packet.

What constitutes a duplicate TCP packet? If it has the same sequence number (seq), acknowledgment number (ack), the same Payload, and the same flags, then it can be considered a retransmitted packet.

Why is time not considered? Because the TCP protocol does not account for time!

Additionally:
* If the SYN flag is present, then this is a retransmitted handshake packet.
* If the FIN flag is present, then this is a retransmitted teardown packet.
* If the ACK flag is present and the packet acknowledges a handshake packet (where the packet to be acknowledged has the SYN flag), then this is a retransmitted acknowledgment handshake packet.
* If the ACK flag is present and the Payload is empty, then this is a retransmitted acknowledgment packet.
* If the ACK flag is present and the Payload is not empty, then this is a retransmitted data packet.

There are also two situations that are not duplicate packets but are still retransmitted packets:

1. Starting from the third handshake packet, the server may not be able to receive packets from the client properly, meaning the handshake has not actually completed on the server side. If there are no packets that need acknowledgment or if they have already been acknowledged, and there is only the ACK flag with an empty Payload, then this is a retransmitted handshake acknowledgment packet.
2. If the seq has changed (usually by +1), it does not meet the criteria for duplication. If no packets that need acknowledgment have been found or they have already been acknowledged, and it has the same acknowledgment number (ack), an empty Payload, only the ACK flag, and this is not a Keep-Alive packet, and the window size has not been updated, then this is a retransmitted acknowledgment packet.

## How to Identify a Packet as a Keep-Alive Packet?

If there are no packets that need acknowledgment or they have already been acknowledged, and the packet has only the ACK flag with an empty Payload, then it meets one of the following two conditions to be considered a Keep-Alive packet:
* The time interval since the last packet sent is more than 5 seconds. This is the key to distinguishing between a retransmitted packet and a Keep-Alive packet, as the Keep-Alive interval is usually not less than 5 seconds.
* The seq of the current packet is equal to that of the last packet sent, and the last packet was a Keep-Alive packet.

If there is a packet that needs acknowledgment, and the packet to be acknowledged is a Keep-Alive packet, then this packet is a Keep-Alive acknowledgment packet (the packet that replies to the Keep-Alive). Keep-Alive acknowledgment packets do not experience retransmission because they do not need to wait for a response from the other party.
