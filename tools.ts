import {
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

export const DISEASE_GUIDE_TOOL: Tool = {
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

export const DISEASE_LIST_TOOL: Tool = {
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