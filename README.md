# Zydsoft MCP Server

MCP Server for the Zydsoft API

[辨证云®开放接口文档](https://c.zydsoft.cn/open/v2/docs/).

## Tools

1. `diseaseGuide`
   - 病症导诊
   - API文档：[https://c.zydsoft.cn/open/v2/docs/?page=75c575c75bfc8bca](https://c.zydsoft.cn/open/v2/docs/?page=75c575c75bfc8bca).
2. `diseaseList`
   - 病症和科目列表
   - API文档：[https://c.zydsoft.cn/open/v2/docs/?page=75c575c7548c79d176ee52178868](https://c.zydsoft.cn/open/v2/docs/?page=75c575c7548c79d176ee52178868).

## Setup

### PartnerId and API Key

Get a Zydsoft PartnerId and API key by following the instructions
[here](https://c.zydsoft.cn/partner/#/studio).

### NPX

```json
{
  "mcpServers": {
    "zydsoft": {
      "command": "npx",
      "args": [
        "-y",
        "zyd-mcp-server"
      ],
      "env": {
        "ZYDSOFT_PARTNERID": "<YOUR_PARTNERID>",
        "ZYDSOFT_API_KEY": "<YOUR_API_KEY>",
        "ZYDSOFT_API_BASEURL": "https://c.zydsoft.cn/open/v2/api"
      }
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to
use, modify, and distribute the software, subject to the terms and conditions of
the MIT License. For more details, please see the LICENSE file in the project
repository.
