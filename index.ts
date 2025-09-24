#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js"
import { callTools } from './functions.js'
import { MAPS_TOOLS } from './tools.js'

// 使用 import() 动态导入 JSON 文件
const packageJson = await import('./package.json', {
  assert: { type: 'json' }
})
const { name, version } = packageJson.default

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

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  return await callTools(request) // Call the function from functions.ts
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