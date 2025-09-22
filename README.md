# Zydsoft MCP Server

MCP Server for the Zydsoft API

[辨证云®开放接口文档](https://c.zydsoft.cn/open/v2/docs/).

## Tools

1. `diseaseGuide`
   - 病症导诊
   - API文档参考：[https://c.zydsoft.cn/open/v2/docs/?page=75c575c75bfc8bca](https://c.zydsoft.cn/open/v2/docs/?page=75c575c75bfc8bca).
   - Input: 
     - `find` (string): 搜索文字，多个查询字符用英文逗号分隔，例如：头痛,发热,恶寒；也支持自然语言检索，但关键症候建议使用分隔符（支持的分隔符：中英文逗号、空格、顿号、换行符、中英文分号、句号）例如：我今天有点头痛，还伴有发热，恶寒、咳嗽
     - `size` (number): 确定返回的症候数组、三个批次病症关联病症的数量，默认10
   - Returns: 
     - `find` (array): 搜索文字数组
     - `diseaseFirst` (array)
     - `diseaseSecond` (array)
     - `diseaseThird` (array)
     - `symptom` (array)

## Setup

### API Key
Get a Zydsoft API key by following the instructions [here](https://c.zydsoft.cn/partner/#/studio).

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
        "ZYDSOFT_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
