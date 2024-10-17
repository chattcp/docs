# Configuring to Use Relative Sequence Numbers

Users who have used Wireshark may wonder why the sequence numbers displayed by ChatTCP and Wireshark are different for the same pcap file.

This is because Wireshark displays relative sequence numbers, while ChatTCP defaults to displaying the actual sequence numbers decoded from the packets.

However, since the starting value of the sequence number is random and usually quite large, it is not conducive to our analysis. Therefore, ChatTCP also provides support for displaying relative sequence numbers, which can be enabled if needed.

![Setting use relative sequence number](/images/relative-sequence-neumber/setting.png)

It is important to note that changes to the configuration will only take effect after reopening the file or restarting the ChatTCP application.
