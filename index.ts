#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import {
  diseaseGuide,
  diseaseList
} from './functions.js'
import {
  DISEASE_GUIDE_TOOL,
  DISEASE_LIST_TOOL
} from './tools.js'
// 使用 import() 动态导入 JSON 文件
const packageJson = await import('./package.json', {
  assert: { type: 'json' }
})
const { name, version } = packageJson.default

const MAPS_TOOLS = [
  DISEASE_GUIDE_TOOL,
  DISEASE_LIST_TOOL
] as const

const server = new Server(
  {
    name,
    version,
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

// Set up request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: MAPS_TOOLS,
}))

server.setRequestHandler(CallToolRequestSchema, async (request): Promise<any> => {
  try {
    switch (request.params.name) {
      case "diseaseGuide": {
        const { find, size } = request.params.arguments as { find: string, size: number }
        return await diseaseGuide({ find, size })
      }
      
      case "diseaseList": {
        const { listId } = request.params.arguments as { listId: string }
        return await diseaseList({ listId })
      }

      default:
        return {
          content: [{
            type: "text",
            text: `Unknown tool: ${request.params.name}`
          }],
          isError: true
        }
    }
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Error: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    }
  }
})

async function runServer() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Zydsoft MCP Server running on stdio")
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error)
  process.exit(1)
})