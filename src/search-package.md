# Advanced Search

To simplify the analysis process, ChatTCP parses all connections in pcap (or pcapng) files, reassembling round-trip packets by connection to display them as chat records. Therefore, ChatTCP defaults to supporting filtering by connection and fuzzy search.

However, in practical use, pcap files can be very large, yielding numerous connections or a high number of round-trip packets within a single connection. In such cases, finding packets whose Payload contains a specific string by searching through each connection individually can be extremely difficult.

To address this issue, ChatTCP provides an advanced search function that supports global searching of packets based on conditions such as TCP flags and Payload. Similarly, there is no need to remember how to write filter expressions like in Wireshark.

![Advanced search](/images/search-package/advanced-search.png)

The ChatTCP search function also supports setting search criteria based on application layer protocols. For instance, when we select the HTTP protocol, the input criteria transform into searchable fields within the data structure of the HTTP protocol.

![Http protocol search](/images/search-package/http-search-condtion.png)