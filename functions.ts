import {
  DiseaseGuide,
  DiseaseList,
  DiseaseLoad,
  MedicalrecordLoad,
  KnowledgebaseLoad
} from "./interface.js"
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

      case "diseaseLoad": {
        const { diseaseId } = request.params.arguments as { diseaseId: string }
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await diseaseLoad({ diseaseId }), null, 2)
          }],
          isError: false
        }
      }

      case "quickDiagnosis": {
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await quickDiagnosis({ ...request.params.arguments }), null, 2)
          }],
          isError: false
        }
      }

      case "medicalrecordLoad": {
        const { medicalrecordId } = request.params.arguments as { medicalrecordId: string }
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await medicalrecordLoad({ medicalrecordId }), null, 2)
          }],
          isError: false
        }
      }

      case "knowledgebaseTypeList": {
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await knowledgebaseTypeList(), null, 2)
          }],
          isError: false
        }
      }

      case "knowledgebaseList": {
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await knowledgebaseList({ ...request.params.arguments }), null, 2)
          }],
          isError: false
        }
      }

      case "knowledgebaseLoad": {
        const { knowledgeBaseId } = request.params.arguments as { knowledgeBaseId: string }
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await knowledgebaseLoad({ knowledgeBaseId }), null, 2)
          }],
          isError: false
        }
      }

      case "medicalrecordList": {
        return {
          content: [{
            type: "text",
            text: JSON.stringify(await medicalrecordList({ ...request.params.arguments }), null, 2)
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

async function diseaseLoad({ diseaseId }: DiseaseLoad) {
  return await callZydsoftApi({
    module: "disease/load",
    params: { diseaseId }
  })
}

async function quickDiagnosis({ ...args }: any) {
  const symptom = args.symptom
  delete args.symptom
  return await callZydsoftApi({
    method: "post",
    module: "quickDiagnosis",
    params: { ...args },
    data: symptom
  })
}

async function knowledgebaseTypeList() {
  return await callZydsoftApi({
    module: "knowledgebase/type/list"
  })
}

async function knowledgebaseList({ ...args }: any) {
  return await callZydsoftApi({
    module: "knowledgebase/list",
    params: { ...args }
  })
}

async function knowledgebaseLoad({ knowledgeBaseId }: KnowledgebaseLoad) {
  return await callZydsoftApi({
    module: "knowledgebase/load",
    params: { knowledgeBaseId }
  })
}

async function medicalrecordLoad({ medicalrecordId }: MedicalrecordLoad) {
  return await callZydsoftApi({
    module: "medicalrecord/load",
    params: { medicalrecordId }
  })
}

async function medicalrecordList({ ...args }: any) {
  return await callZydsoftApi({
    module: "medicalrecord/list",
    params: { ...args }
  })
}

