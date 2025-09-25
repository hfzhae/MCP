<img width="144" height="144" alt="627efc0b8dd24c99da2e4580cef1e6f5" src="https://github.com/user-attachments/assets/07d1b537-9071-463c-ba1d-9548cd67aa98" />

# zydsoft MCP Server

## what is 辨证云?

辨证云 is an AI-based intelligent auxiliary system for traditional Chinese medicine (TCM) diagnosis, combining artificial neural networks and expert knowledge graphs. It simulates the entire process of TCM diagnosis and treatment, replicating the diagnostic thinking of TCM experts and providing various prescription combinations including traditional formulas, Chinese patent medicines, acupuncture, and dietary therapy.

## how to use 辨证云?

Users can access the system through the AI SaaS platform or the no-code PaaS platform. They can input their main symptoms and receive tailored treatment recommendations based on the established TCM diagnostic reasoning model.

## key features of 辨证云?

- AI-driven TCM diagnosis and treatment recommendations
- Integration of expert knowledge and neural network models
- Support for over 400 diseases and TCM treatment protocols
- Unique dual-diagnosis system based on the "Shang Han Lun" theory

## use cases of 辨证云?

- Assisting practitioners in diagnosing complex TCM cases
- Providing patients with personalized treatment plans
- Supporting research in TCM through clinical data analysis

## FAQ from 辨证云?

- Can 辨证云 assist with all TCM conditions?
> Yes! 辨证云 covers a wide range of TCM conditions and treatment options.

- Is 辨证云 free to use?
> Access to the platform may vary; please check the official documentation for details.

- How accurate is 辨证云?
> The system has been clinically validated with a compliance rate of over 90% compared to expert diagnoses.

![Snipaste_2025-09-25_12-52-59](https://github.com/user-attachments/assets/f9c69559-97f7-4986-9927-682bd1d00430)

## MCP Server for the zydsoft API

- [辨证云®开放接口文档](https://c.zydsoft.cn/open/v2/docs/).

## Tools

- `diseaseGuide`
  - 病症导诊：https://c.zydsoft.cn/open/v2/docs/?page=75c575c75bfc8bca.
- `diseaseList`
  - 病症和科目列表：https://c.zydsoft.cn/open/v2/docs/?page=75c575c7548c79d176ee52178868.
- `diseaseLoad`
  - 病症获取：https://c.zydsoft.cn/open/v2/docs/?page=75c575c783b753d6.
- `quickDiagnosis`
  - 快捷辨证：https://c.zydsoft.cn/open/v2/docs/?page=5feb63778fa88bc1.
- `knowledgebaseTypeList`
  - 知识库类型列表：https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e937c7b578b52178868.
- `knowledgebaseList`
  - 知识库列表：https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e9352178868.
- `knowledgebaseLoad`
  - 知识库获取：https://c.zydsoft.cn/open/v2/docs/?page=77e58bc65e9383b753d6.
- `medicalrecordList`
  - 病案列表：https://c.zydsoft.cn/open/v2/docs/?page=75c5684852178868.
- `medicalrecordLoad`
  - 病案获取：https://c.zydsoft.cn/open/v2/docs/?page=75c5684883b753d6.
- `methodOfPreparation`
  - 炮制方法：https://c.zydsoft.cn/open/v2/docs/?page=70ae523665b96cd5.
- `followupadd`
  - 病案创建复诊：https://c.zydsoft.cn/open/v2/docs/?page=75c56848521b5efa590d8bca.
- `medicalrecordConfirm`
  - 病案确认：https://c.zydsoft.cn/open/v2/docs/?page=75c56848786e8ba4.
- `assessment`
  - 整体疗效评估：https://c.zydsoft.cn/open/v2/docs/?page=65744f53759765488bc44f30.
- `symptomAssessment`
  - 症候疗效评估：https://c.zydsoft.cn/open/v2/docs/?page=75c75019759765488bc44f30.

## Setup

### PartnerId and API Key and IP address whitelist

Get zydsoft's PartnerId and API key, and set up the IP address whitelist according to the instructions.
- https://c.zydsoft.cn/partner/#/studio.

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
