# Zydsoft MCP Server

MCP Server for the Zydsoft API

[辨证云®开放接口文档](https://c.zydsoft.cn/open/v2/docs/).

## Tools

- `diseaseGuide`
  - 病症导诊：[https://c.zydsoft.cn/open/v2/docs/?page=75c575c75bfc8bca](https://c.zydsoft.cn/open/v2/docs/?page=75c575c75bfc8bca).
- `diseaseList`
  - 病症和科目列表：[https://c.zydsoft.cn/open/v2/docs/?page=75c575c7548c79d176ee52178868](https://c.zydsoft.cn/open/v2/docs/?page=75c575c7548c79d176ee52178868).
- `diseaseLoad`
  - 病症获取：[https://c.zydsoft.cn/open/v2/docs/?page=75c575c783b753d6](https://c.zydsoft.cn/open/v2/docs/?page=75c575c783b753d6).
- `quickDiagnosis`
  - 快捷辨证：[https://c.zydsoft.cn/open/v2/docs/?page=5feb63778fa88bc1](https://c.zydsoft.cn/open/v2/docs/?page=5feb63778fa88bc1).
- `knowledgebaseTypeList`
  - 知识库类型列表：[https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e937c7b578b52178868](https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e937c7b578b52178868).
- `knowledgebaseList`
  - 知识库列表：[https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e9352178868](https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e9352178868).
- `knowledgebaseLoad`
  - 知识库获取：[https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e9383b753d6](https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e9383b753d6).
- `medicalrecordList`
  - 病案列表：[https://c.zydsoft.cn/open/v2/docs/?page=75c5684852178868](https://c.zydsoft.cn/open/v2/docs/?page=75c5684852178868).
- `medicalrecordLoad`
  - 病案获取：[https://c.zydsoft.cn/open/v2/docs/?page=75c5684883b753d6](https://c.zydsoft.cn/open/v2/docs/?page=75c5684883b753d6).
- `methodOfPreparation`
  - 炮制方法：[https://c.zydsoft.cn/open/v2/docs/?page=70ae523665b96cd5](https://c.zydsoft.cn/open/v2/docs/?page=70ae523665b96cd5).
- `followupadd`
  - 病案创建复诊：[https://c.zydsoft.cn/open/v2/docs/?page=75c56848521b5efa590d8bca](https://c.zydsoft.cn/open/v2/docs/?page=75c56848521b5efa590d8bca).
- `medicalrecordConfirm`
  - 病案确认：[https://c.zydsoft.cn/open/v2/docs/?page=75c56848786e8ba4](https://c.zydsoft.cn/open/v2/docs/?page=75c56848786e8ba4).
- `assessment`
  - 整体疗效评估：[https://c.zydsoft.cn/open/v2/docs/?page=65744f53759765488bc44f30](https://c.zydsoft.cn/open/v2/docs/?page=65744f53759765488bc44f30).
- `symptomAssessment`
  - 症候疗效评估：[https://c.zydsoft.cn/open/v2/docs/?page=75c75019759765488bc44f30](https://c.zydsoft.cn/open/v2/docs/?page=75c75019759765488bc44f30).

## Setup

### PartnerId and API Key and IP address whitelist

[Get Zydsoft's PartnerId and API key, and set up the IP address whitelist according to the instructions.](https://c.zydsoft.cn/partner/#/studio).

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
