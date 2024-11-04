# ChatTCP Personalization Configuration

ChatTCP extracts some personalized needs into independent configuration items, which you can modify according to your
personal requirements.

![ChatTCP setting](/images/about-settings/setting-page.webp)

## Use relative sequence number

The sequence number defaults to showing the real value, but since the real value does not start from 0, it does not
conform to human reading habits. Therefore, ChatTCP provides this configuration item, allowing you to configure the use
of relative sequence numbers.

Not using relative sequence numbers:
![use real seq number](/images/about-settings/use-real-seq-number.webp)

Using relative sequence numbers:
![use relative seq number](/images/about-settings/use-relative-seq-number.webp)

## Show connection status

You can configure whether to display the [TCP Connection Status](/understand-the-connection-status-of-the-tcp-protocol).

Displaying TCP connection status:
![show tcp conn status](/images/about-settings/show-conn-status.webp)

Not displaying TCP connection status:
![hidden tcp conn status](/images/about-settings/hidden-conn-status.webp)

## Chat note display enable

Displaying Notes can help you understand data packets. This feature is particularly useful when you are not very
familiar with the TCP protocol. However, once you become proficient with the TCP protocol, this feature may seem
redundant.

Show notes:
![chat note show enable](/images/about-settings/chat-note-show-enable.webp)

Do not show notes:
![chat note show disable](/images/about-settings/chat-note-show-disable.webp)

## Threshold for auto fold payload

When the Payload is too long, it can cause UI rendering lag. Therefore, if the Payload is too long, it will be folded
and only displayed when clicked. The default threshold is 1024 bytes, and when the Payload exceeds this threshold, it
will be folded.

When folded:
![auto fold too long payload](/images/about-settings/auto-fold-too-long-payload.webp)

You can modify this threshold.

## Chat payload display style

ChatTCP automatically recognizes the correct application layer protocol to decode the TCP packet's Payload. If decoding
is successful, it will determine how to display the decoded data based on this configuration item.

### Structure Priority (Default)

If supported, the decoded data will be mapped to the corresponding application layer protocol's data structure view for
display.

For example:
![chat payload display style simple](/images/about-settings/chat-payload-display-style-structure.webp)

### Simple Priority

If supported, only the application layer protocol's Payload will be displayed.

For example, the WebSocket protocol only displays the frame's Payload:
![chat payload display style simple](/images/about-settings/chat-payload-display-style-simple.webp)