import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { callZydsoftApi } from "./utils.js"

const toolsList = await callZydsoftApi({
  module: "mcp/tools"
})
export const MAPS_TOOLS = toolsList.map((item: any) => {
  const tool: Tool = {
    name: item.function.name,
    description: item.function.description,
    inputSchema: item.function.parameters
  }
  return tool
})
