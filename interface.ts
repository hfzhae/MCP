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