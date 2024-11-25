# MySQL Protocol Decode Settings

Starting from version 2.6, ChatTCP supports MySQL protocol decoding, similar to Wireshark's implementation. To correctly decode MySQL protocol data, we need to configure the port number of the MySQL server, which defaults to 3306. If the port number of the MySQL server we are capturing is not 3306, we need to modify the "MySQL protocol port" configuration item to the correct port number to correctly decode MySQL protocol data.

![MySQL protocol port setting | ChatTCP](/images/mysql-protocol-decode-settings/mysql-protocol-port-setting.webp)

So, why do we need to configure a port number to correctly decode the MySQL protocol?

Due to the special nature of the MySQL protocol, the protocol encoding for clients and servers does not use a unified data structure like the WebSocket protocol, nor does it have an obvious Start Line distinction like the HTTP protocol. When ChatTCP decodes the MySQL protocol, it can only identify whether the data packet is sent by a MySQL client or a MySQL server based on the destination port number.

