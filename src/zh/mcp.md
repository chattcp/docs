# ChatTCP MCP

ChatTCP MCP 用来让 AI 分析 PCAP 文件。在 Cursor、Claude 这类客户端里直接提问，AI 会调用 ChatTCP 去看这个抓包。

本地和远程二选一。远程的配置在 [MCP 页面](https://chattcp.com/zh/mcp)。本地默认端口是 17380，在 ChatTCP 首页可以改。

## 本地 MCP (APP)

PCAP 留在你这台电脑上，不会上传。本地 MCP 只分析 TCP，不支持 UDP。

先下载 [ChatTCP](https://chattcp.com/zh/download)，打开 App。默认端口是 17380。点首页左侧的 MCP，可以看到端口，也可以改成没被占用的端口。面板里能复制 AI 客户端的配置，也能看到是否正在监听。端口被占用时，这里会显示错误。

ChatTCP 必须保持在后台运行。App 进程一退出，本地 MCP 就停了。如果改了端口，配置里的端口要和首页上的一致。

打开 [本地 MCP (APP)](https://chattcp.com/zh/mcp?tab=local) 可以复制默认端口的配置。Cursor 把这段贴进 `~/.cursor/mcp.json`。别的支持 MCP 的客户端，加到它自己的 MCP 配置里。

```json
{
  "mcpServers": {
    "chattcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://127.0.0.1:17380/mcp"
      ]
    }
  }
}
```

> 配置里的 `npx` 不是系统自带的。先安装 Node.js：<https://nodejs.org>。安装包里包含 npm 和 npx。装好后在终端执行 `npx -v`，能看到版本号就可以。本地和远程都要用它。

配好之后，在对话里说出这台电脑上的文件路径，例如：

> 帮我分析 /Users/me/a.pcap，服务端端口 8080 的连接为什么客户端发出请求后没有响应。

## 远程 MCP （网站）

PCAP 会上传到 ChatTCP 的服务器再分析。不用安装 App。

打开 [远程 MCP （网站）](https://chattcp.com/zh/mcp?tab=remote)，登录后生成 API 密钥。密钥只显示一次，生成后自己保存。复制配置，把里面的 `your-api-key` 换成你的密钥，再贴到客户端的 MCP 配置里。

```json
{
  "mcpServers": {
    "chattcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.chattcp.com/mcp",
        "--header",
        "X-API-Key: your-api-key"
      ]
    }
  }
}
```
> 配置里的 `npx` 不是系统自带的。先安装 Node.js：<https://nodejs.org>。安装包里包含 npm 和 npx。装好后在终端执行 `npx -v`，能看到版本号就可以。本地和远程都要用它。

配好之后直接问，例如：

> 帮我分析这个 PCAP，看看 HTTP 响应的 Body 为什么是空的。

AI 会把文件上传到 ChatTCP 服务器再回答。

## 怎么选

文件不能离开这台电脑，用本地 MCP。需要先装好 ChatTCP，并让 App 保持打开。

不想安装 App，用远程 MCP。文件会上传到 ChatTCP 服务器。
