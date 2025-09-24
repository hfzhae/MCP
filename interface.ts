export interface DiseaseGuide {
  find: string
  size: number
}

export interface DiseaseList {
  listId: string
}

export interface Token {
  partnerId: string
  token: string
  expiresIn: number
  createdAt: string
}

export interface DiseaseLoad {
  diseaseId: string
}

export interface MedicalrecordLoad {
  medicalrecordId: string
}

export interface KnowledgebaseLoad {
  knowledgeBaseId: string
}