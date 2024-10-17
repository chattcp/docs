# TCP Analysis using ChatTCP

Have you downloaded ChatTCP? If not, you can click this link to download it: [chattcp.com](https://chattcp.com)

Before we start, we need to prepare a pcap (or pcapng) file, which is a packet capture file. If you forget how to write the tcpdump command, ChatTCP provides a small utility: [Generate tcpdump command using ChatTCP](/generate-tcpdump-command-using-chattcp)

## Select a File to Open

Open ChatTCP, click "Click to select a file" and choose a pcap file to open.

![Click to select file](/images/tcp-analysis-using-chattcp/click-to-select-file.png)

If you are currently learning and have not captured any packets yet, you can check out some classic cases provided by ChatTCP. You can read this document: [Classic Cases](/classic-case)

## Introduction to the Analysis Window

After selecting a file to open, an analysis window will appear. This window is divided into three work areas: left, middle, and right.

![Analysis window](/images/tcp-analysis-using-chattcp/analysis-window.png)

### Left Workspace

This area displays analysis statistics and all TCP connections identified.

![Filter stream](/images/tcp-analysis-using-chattcp/analysis-left-workspace.png)

* Analysis Statistics: Statistics of the analysis results for the file, including the total number of connections, how many connections have incomplete three-way handshakes, and how many connections have retransmitted packets, etc.
* TCP Connection List: Lists all TCP connections and supports fuzzy search to filter connections.

### Middle Workspace

This area displays all round-trip packets of a TCP connection in a chat-like format, showing the packets in the order they were sent. Each Chat represents a TCP packet.

When we select a connection in the left workspace, this area will update to display the "chat history" for that connection.

![Chat window](/images/tcp-analysis-using-chattcp/analysis-main-workspace.png)

A Chat includes: sender IP:PORT, the state of the connection after the packet is sent, packet sending time, seq, ack, flags, Payload (if any), and description.

![One chat](/images/tcp-analysis-using-chattcp/chat-struct.png)

If you forget what the flags mean, you can hover over the flags to see a tooltip.

![Flag tips](/images/tcp-analysis-using-chattcp/chat-tcp-flag-tips.png)

If you don't understand how to interpret this TCP packet, you can enable "Turn on commentary," and ChatTCP will show you how to understand the packet.

![Commentary](/images/tcp-analysis-using-chattcp/chat-commentary.png)

If you want to understand the entire TCP packet, you can click the "Show" button, which will pop up a view at the bottom to display the details of the packet.

![TCP Structure](/images/tcp-analysis-using-chattcp/tcp-structure.png)

By default, the packet will be mapped to the TCP data structure for display, and it also supports hexadecimal view mode.

![TCP Structure Hex](/images/tcp-analysis-using-chattcp/tcp-structure-hex.png)

When we click outside the pop-up view, the pop-up will disappear.

ChatTCP will automatically recognize the application layer protocol used by the packet's Payload and decode it. If the decoding is successful, the Chat will display the data structure of the application layer protocol and support switching to Raw.

![Chat payload decode as websocket](/images/tcp-analysis-using-chattcp/chat-payload-websocket.png)

### Right Workspace

This area displays diagnostic analysis of the currently selected connection, such as network latency and retransmission conditions.

![Diagnostic analysis](/images/tcp-analysis-using-chattcp/analysis-right-workspace.png)
