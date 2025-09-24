import { DiseaseGuide, DiseaseList } from "./interface.js"
import { callZydsoftApi } from "./utils.js"

export async function callTools(request: any): Promise<any> {
  try {
    switch (request.params.name) {
      case "diseaseGuide": {
        const { find, size } = request.params.arguments as { find: string, size: number }
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await diseaseGuide({ find, size }), null, 2)
          }],
          isError: false
        }
      }

      case "diseaseList": {
        const { listId } = request.params.arguments as { listId: string }
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await diseaseList({ listId }), null, 2)
          }],
          isError: false
        }
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
}
async function diseaseGuide({ find, size }: DiseaseGuide) {
  return await callZydsoftApi({
    module: "disease/guide",
    params: { find, size }
  })
}
async function diseaseList({ listId }: DiseaseList) {
  return await callZydsoftApi({
    module: "disease/list",
    params: listId ? { listId } : {}
  })
}
