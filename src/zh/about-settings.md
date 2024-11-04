# ChatTCP个性化配置

ChatTCP将一些个性化需求提取为独立的配置项，您可根据个人需求来修改这些配置项。

![ChatTCP setting](/images/about-settings/setting-page.webp)

## 使用相对序列号

序列号默认显示真实值，但由于真实值不是从0开始的，不符合人类的阅读习惯，因此ChatTCP提供该配置项，您可配置使用相对序列号。

不使用相对序列号：
![use real seq number](/images/about-settings/use-real-seq-number.webp)

使用相对序列号：
![use relative seq number](/images/about-settings/use-relative-seq-number.webp)

## 显示TCP连接状态

您可配置是否显示[TCP连接状态](/zh/understand-the-connection-status-of-the-tcp-protocol)。

显示TCP连接状态：
![show tcp conn status](/images/about-settings/show-conn-status.webp)

不显示TCP连接状态：
![hidden tcp conn status](/images/about-settings/hidden-conn-status.webp)

## 是否显示备注

显示备注可以帮助您理解数据包。 当您不太了解 TCP 协议时，这项功能尤其有用。 不过，一旦您熟练掌握了 TCP 协议，这项功能可能就显得多余了。

显示备注：
![chat note show enable](/images/about-settings/chat-note-show-enable.webp)

不显示备注：
![chat note show disable](/images/about-settings/chat-note-show-disable.webp)

## 自动折叠Payload的长度阈值

当Payload过长时会导致UI渲染卡顿，因此Payload过长会被折叠，点击后才展开显示Payload。默认阈值为1024字节，当Payload超过阈值，Payload就会被折叠。

被折叠时：
![auto fold too long payload](/images/about-settings/auto-fold-too-long-payload.webp)

您可修改该阈值。

## Payload的显示样式

ChatTCP会自动识别使用正确的应用层协议来解码TCP数据包的Payload，如果解码成功，就会根据此配置项来决定如何显示解码后的数据。

### Structure priority （默认）

如果支持的话，将解码后的数据映射到对应的应用层协议的数据结构视图显示。

例如：
![chat payload display style simple](/images/about-settings/chat-payload-display-style-structure.webp)

### Simple priority

如果支持的话，只显示应用层协议的Payload。

例如，WebSocket协议只显示frame的Payload：
![chat payload display style simple](/images/about-settings/chat-payload-display-style-simple.webp)


