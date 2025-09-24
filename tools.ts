import { Tool } from "@modelcontextprotocol/sdk/types.js";


const DISEASE_GUIDE_TOOL: Tool = {
  name: "diseaseGuide",
  description: "病症导诊",
  inputSchema: {
    type: "object",
    properties: {
      find: { type: "string", minLength: 1, maxLength: 200, description: "搜索文字，多个查询字符用英文逗号分隔，例如：头痛,发热,恶寒；也支持自然语言检索，但关键症候建议使用分隔符（支持的分隔符：中英文逗号、空格、顿号、换行符、中英文分号、句号）例如：我今天有点头痛，还伴有发热，恶寒、咳嗽" },
      size: { type: "number", default: 10, description: "确定返回的症候数组、三个批次病症关联病症的数量，默认10" }
    },
    required: ["find"]
  }
}

const DISEASE_LIST_TOOL: Tool = {
  name: "diseaseList",
  description: "病症和科目列表",
  inputSchema: {
    type: "object",
    properties: {
      listId: { type: "string", maxLength: 24, description: "科目ID" }
    },
    required: []
  }
}

const DISEASE_LOAD_TOOL: Tool = {
  name: "diseaseLoad",
  description: "病症获取",
  inputSchema: {
    type: "object",
    properties: {
      diseaseId: { type: "string", maxLength: 24, description: "病症id，接收方提供，从API：科目、病症列表 获取" }
    },
    required: ["diseaseId"]
  }
}

const QUICK_DIAGNOSIS_TOOL: Tool = {
  name: "quickDiagnosis",
  description: "快捷辨证",
  inputSchema: {
    type: "object",
    properties: {
      diseaseId: { type: "string", maxLength: 24, description: "病症id，接收方提供，从API：科目、病症列表 获取" },
      doctorId: { type: "string", maxLength: 24, description: "医生ID，和 用户ID 至少提供一个，可通过 医生新增 新增医生获得" },
      patientId: { type: "string", maxLength: 24, description: "用户ID，和 医生ID 至少提供一个，可通过 用户新增 新增用户获得" },
      patientsId: { type: "string", maxLength: 24, description: "患者ID，可通过 患者新增 新增患者获得，如果为空，name、gender、dateofBirth为必填" },
      name: { type: "string", maxLength: 20, description: "患者姓名，如果patientsId为空，此参数为必填" },
      gender: { type: "string", maxLength: 10, description: "患者性别（男 或 女），示例：男，如果patientsId为空，此参数为必填" },
      dateofBirth: { type: "string", format: "date", maxLength: 20, description: "患者出生日期，示例：2004-5-9，如果patientsId为空，此参数为必填" },
      phone: { type: "string", maxLength: 50, description: "患者电话" },
      address: { type: "string", maxLength: 200, description: "患者地址" },
      height: { type: "number", description: "患者身高" },
      weight: { type: "number", description: "患者体重" },
      temperature: { type: "number", description: "患者体温" },
      heartRate: { type: "number", description: "患者心率" },
      bloodPressureSBP: { type: "number", description: "患者血压收缩压" },
      bloodPressureDBP: { type: "number", description: "患者血压舒张压" },
      medicalhistory: { type: "string", maxLength: 500, description: "患者病史，既往病史，多个用逗号（英文）分隔" },
      allergic: { type: "string", maxLength: 5000, description: "患者过敏史" },
      other: { type: "string", maxLength: 5000, description: "患者其他信息" },
      symptom: {
        type: "array",
        description: "患者症状",
        items: {
          type: "object",
          properties: {
            title: { type: "string", maxLength: 200, description: "症候名称，使用 病症获取 接口中的症候title，示例：鼻塞、喷嚏" },
            value: { type: "boolean", description: "症候是否出现,true:出现,false:未出现", default: true },
            levels: {
              type: "number",
              minimum: 1,
              maximum: 5,
              description: "程度评估：1：偶尔（略微）2：较少（有点）3：较多（一般）4：很多（非常）5：总是（极其），小于1时默认为1，大于5时默认为5",
              default: 3
            },
            meridianFlow: {
              type: "array",
              description: "子午归经，长度为12的数组，每一位对应一个时辰：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥（同时对应着人体的十二条经络），如果该症候发作时间在某个时辰内，则数组提交的值为1，例如：症候咳嗽发作在子时，那么提交的内容则为：[1,0,0,0,0,0,0,0,0,0,0,0]，可支持发作在多个时辰内，子午归经的描述详见 子午归经",
              items: {
                type: "integer",
                enum: [0, 1]
              },
              minItems: 12,
              maxItems: 12,
              examples: ([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            },
            durationId: { type: "number", description: "六经传变/持续时间ID，六经传变/持续时间的标准结构请见 六经传变 ，小于-1时或大于9时，默认为-1，六经传变参数值参考：1天以内：0,1天：1，2天：2，3天：3，4天：4，5天：5，6天：6，一周以上，四周以内：7，一月以上，一年以内：8，一年以上：9" },
          },
          required: ["title", "levels"]
        }
      },
    },
    required: ["diseaseId", "name", "gender", "dateofBirth", "symptom"]
  }
}

const KNOWLEDGEBASE_TYPE_LIST_TOOL: Tool = {
  name: "knowledgebaseTypeList",
  description: "知识库类型列表",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
}

const KNOWLEDGEBASE_LIST_TOOL: Tool = {
  name: "knowledgebaseList",
  description: "知识库列表",
  inputSchema: {
    type: "object",
    properties: {
      knowledgeBaseTypeId: { type: "string", maxLength: 24, description: "知识库类型ID，knowledgeBaseTypeId、typeId和find必须有一个不为空" },
      typeId: { type: "string", maxLength: 24, description: "知识库子类型ID，knowledgeBaseTypeId、typeId和find必须有一个不为空" },
      find: { type: "string", minLength: 1, maxLength: 500, example: "{\"title\":{\"$regex\":\"柴胡\"}}", description: "查询条件，json文本，示例：{\"title\":{\"$regex\":\"柴胡\"}}，knowledgeBaseTypeId、typeId和find必须有一个不为空 " },
      sortName: { type: "string", maxLength: 200, default: "createdAt", description: "排序列名，默认createdAt" },
      order: { type: "number", default: -1, description: "排序参数，默认-1，1 为升序排列，-1 为降序排列" },
      limit: { type: "number", default: 20, description: "分页行数，最大100" },
      currentPage: { type: "number", default: 1, description: "页码" }
    },
    required: ["find"]
  }
}

const MEDICALRECORD_LOAD_TOOL: Tool = {
  name: "medicalrecordLoad",
  description: "病案获取",
  inputSchema: {
    type: "object",
    properties: {
      medicalrecordId: { type: "string", maxLength: 24, description: "病案ID" }
    },
    required: ["medicalrecordId"]
  }
}

const KNOWLEDGEBASE_LOAD_TOOL: Tool = {
  name: "knowledgebaseLoad",
  description: "知识库获取",
  inputSchema: {
    type: "object",
    properties: {
      knowledgeBaseId: { type: "string", maxLength: 24, description: "知识库ID" }
    },
    required: ["knowledgeBaseId"]
  }
}

const MEDICALRECORD_LIST_TOOL: Tool = {
  name: "medicalrecordList",
  description: "知识库获取",
  inputSchema: {
    type: "object",
    properties: {
      dateFrom: { type: "string", format: "date", maxLength: 20, description: "开始日期，默认当天0点，示例：2021-10-23 00:00:00 或 2021-10-23 查询区间不能大于30天" },
      dateTo: { type: "string", format: "date", maxLength: 20, description: "结束日期，默认明天0点，示例：2021-10-23 00:00:00 或 2021-10-23 查询区间不能大于30天" },
      doctorId: { type: "string", maxLength: 24, description: "医生ID" },
      patientId: { type: "string", maxLength: 24, description: "用户ID" },
      find: { type: "string", minLength: 1, maxLength: 500, description: "查询条件，json文本，示例：{\"patients.name\":{\"$regex\":\"张\"}}" },
      sortName: { type: "string", maxLength: 200, default: "createdAt", description: "排序列名，默认createdAt" },
      order: { type: "number", default: -1, description: "排序参数，默认-1，1 为升序排列，-1 为降序排列" },
      limit: { type: "number", default: 20, description: "分页行数，最大100" },
      currentPage: { type: "number", default: 1, description: "	页码" }
    },
    required: []
  }
}


// Define the tools supported by this server
export const MAPS_TOOLS = [
  DISEASE_GUIDE_TOOL,
  DISEASE_LIST_TOOL,
  DISEASE_LOAD_TOOL,
  QUICK_DIAGNOSIS_TOOL,
  KNOWLEDGEBASE_TYPE_LIST_TOOL,
  KNOWLEDGEBASE_LIST_TOOL,
  KNOWLEDGEBASE_LOAD_TOOL,
  MEDICALRECORD_LOAD_TOOL,
  MEDICALRECORD_LIST_TOOL,
] as const
