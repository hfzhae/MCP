#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import { diseaseGuide, getApiKey } from './functions.js'

const ZYDSOFT_MAP_API_KEY = getApiKey();

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
};

const MAPS_TOOLS = [
  DISEASE_GUIDE_TOOL
] as const;

const server = new Server(
  {
    name: "mcp-server/zydsoft-map",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Set up request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: MAPS_TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request): Promise<any> => {
  try {
    switch (request.params.name) {
      case "diseaseGuide": {
        const { find } = request.params.arguments as { find: string };
        return await diseaseGuide({ find });
      }

      default:
        return {
          content: [{
            type: "text",
            text: `Unknown tool: ${request.params.name}`
          }],
          isError: true
        };
    }
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Error: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    };
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Zydsoft MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});