# Advanced Search

To simplify the analysis process, ChatTCP parses all connections in pcap (or pcapng) files, reassembling round-trip packets by connection to display them as chat records. Therefore, ChatTCP defaults to supporting filtering by connection and fuzzy search.

However, in practical use, pcap files can be large, resulting in many parsed connections, or a single connection may have many round-trip packets. In such cases, it can be very difficult to find packets containing a specific character in the payload by searching through each connection one by one. 

To address this issue, ChatTCP provides an advanced search feature that supports global searches for packets based on TCP flags, Payload, and other criteria. Similarly, we do not need to remember how to write filtering expressions like in Wireshark.

![Advanced search](/images/search-package/advanced-search.png)
