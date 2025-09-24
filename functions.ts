import { callZydsoftApi } from "./utils.js"

export async function callTools(request: any): Promise<any> {
  const data = {
    name: request.params.name,
    arguments: JSON.stringify(request.params.arguments)
  }
  return {
    content: [{
      type: "text",
      text: JSON.stringify(await callZydsoftApi({
        method: "post",
        module: "mcp/server",
        data
      }), null, 2)
    }],
    isError: false
  }
}
