# Zydsoft MCP Server

MCP Server for the Zydsoft API.

## Tools

1. `diseaseGuide`
   - 病症导诊
   - Input: 
     - `find` (string): 搜索文字，多个查询字符用英文逗号分隔，例如：头痛,发热,恶寒；也支持自然语言检索，但关键症候建议使用分隔符（支持的分隔符：中英文逗号、空格、顿号、换行符、中英文分号、句号）例如：我今天有点头痛，还伴有发热，恶寒、咳嗽
   - Returns: 
     - `location`: { lat: number, lng: number } 
     - `precise`: number 
     - `confidence`: number 
     - `comprehension`: number 
     - `level`: string 


## Setup

### API Key
Get a Zydsoft API key by following the instructions [here](https://c.zydsoft.cn/partner/#/studio).

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "zyd-server-map": {
      "command": "npx",
      "args": [
        "-y",
        "zyd-mcp-server"
      ],
      "env": {
        "ZYDSOFT_API_KEY": "123"
      }
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
