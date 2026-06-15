# Understanding TCP Retransmission and Out-of-Order

The TCP protocol does not provide a separate flag to indicate whether a packet is a retransmitted packet, an out-of-order packet, or a Keep-Alive packet. However, we can see that Wireshark can identify which packets are retransmitted, out-of-order, or Keep-Alive packets, usually providing prompts like `[TCP Retransmission]`, `[TCP Out-Of-Order]`, or `[TCP Dup ACK]`. It can also identify Keep-Alive packets and Keep-Alive acknowledgment packets, typically showing prompts like `[TCP Keep-Alive]` or `[TCP Keep-Alive ACK]`.

[ChatTCP](https://chattcp.com) is a tool that makes viewing network packets as simple as reading chat history. As a tool designed to simplify TCP packet viewing and analysis, it naturally must be able to identify `[TCP Retransmission]`, `[TCP Out-Of-Order]`, `[TCP Dup ACK]`, `[TCP Keep-Alive]`, and `[TCP Keep-Alive ACK]` packets just like Wireshark. So how do we identify them?

## How to Identify a Packet as a Retransmission or Out-of-Order Packet?

![Wireshark TCP Retransmission - TCP Dup ACK - TCP Out-Of-Order](/images/tcp-packet-retransmission-and-out-of-order/wireshark-tcp-retransmission.webp)

To analyze retransmissions and out-of-order packets, we need to focus on the data stream in the **same direction** (for example, all packets sent from the client to the server). After sorting these packets by capture time, we can analyze them:
* Retransmission: If a packet has appeared before, then this packet is a **duplicate** packet, which means it is a retransmitted packet.
* Out-of-Order: If a packet's sequence number is smaller than the previous packet, it is out of order. `[TCP Out-Of-Order]`

Out-of-order is easy to understand; we just need to check if the sequence number (seq) is in order. However, determining a retransmission is more complicated.

Determining whether a packet is a retransmission essentially means checking if the packet is a **duplicate** packet. So, what exactly qualifies as a **duplicate** TCP packet?

When two packets have the same sequence number (seq), acknowledgment number (ack), and the same Payload and flags, we can confirm this is a **duplicate** packet.

Since having the same sequence number and acknowledgment number implies the Payload must be the same (or both Payloads are empty), this can be simplified: when two packets have the same sequence number, acknowledgment number, and the same flags, we can confirm it is a **duplicate** packet.

Why do the flags also need to be the same to be considered a **duplicate**?

Because when the sequence number and acknowledgment number are the same but the flags are different, one might be a pure acknowledgment packet while the other might be a FIN + ACK packet: (Different behaviors)
```
seq=1000, ack=3000, Flags=ACK 
seq=1000, ack=3000, Flags=FIN, ACK
```

How do we further distinguish between `[TCP Retransmission]` and `[TCP Dup ACK]`? This requires checking the flags. If a retransmitted packet has the ACK flag and is not sending data (Payload is empty), it can generally be determined as `[TCP Dup ACK]`.

In ChatTCP, we further categorize the specific types of retransmitted packets:
- If the SYN flag is present, then this is a retransmitted handshake packet. `[TCP Retransmission]`
- If the FIN flag is present, then this is a retransmitted teardown packet. `[TCP Retransmission]`
- If the ACK flag is present and the packet acknowledges a handshake packet (where the packet to be acknowledged has the SYN flag), then this is a retransmitted handshake acknowledgment packet. `[TCP Dup ACK]`
- If the ACK flag is present and the Payload is empty, then this is a retransmitted acknowledgment packet. `[TCP Dup ACK]`
- If the ACK flag is present and the Payload is not empty, then this is a retransmitted data packet. `[TCP Retransmission]`

## How to Identify a Packet as a Keep-Alive Packet?

![Wireshark TCP Keep-Alive - TCP Keep-Alive ACK](/images/tcp-packet-retransmission-and-out-of-order/wireshark-keep-alive.webp)

Wireshark's conditions for judgment are:
- Only contains the ACK flag
- Payload size is 0 or 1
- seq is equal to the local end's next expected sequence number to be sent minus 1

So how do we differentiate between `[TCP Keep-Alive]` and `[TCP Keep-Alive ACK]`?

If the packet to be acknowledged is a Keep-Alive packet, then this packet is a Keep-Alive acknowledgment packet (`[TCP Keep-Alive ACK]`).

Keep-Alive acknowledgment packets do not experience retransmissions (there is no `[TCP Keep-Alive Retransmission]`), because Keep-Alive packets do not require the other party to definitely reply with an acknowledgment packet.
