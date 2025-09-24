import fs from 'fs'
import { Token } from "./interface.js"
import dotenv from 'dotenv'
import crypto from 'crypto'
dotenv.config({ path: './.env' })

function getApiKey(): string {
  const apiKey = process.env.ZYDSOFT_API_KEY || ""
  if (!apiKey) {
    console.error("ZYDSOFT_API_KEY environment variable is not set")
    process.exit(1)
  }
  return apiKey
}

function getPartnerId(): string {
  const partnerId = process.env.ZYDSOFT_PARTNERID || ""
  if (!partnerId) {
    console.error("ZYDSOFT_PARTNERID environment variable is not set")
    process.exit(1)
  }
  return partnerId
}

function getApiBaseUrl(): string {
  const baseUrl = process.env.ZYDSOFT_API_BASEURL || "https://c.zydsoft.cn/open/v2/api"
  if (!baseUrl) {
    console.error("ZYDSOFT_API_BASEURL environment variable is not set")
    process.exit(1)
  }
  return baseUrl
}

function timestamp() { return Math.floor(Date.now() / 1000) }
/**
 * 签名方法 SHA256 / MD5
 * @param {Object} params
 * @returns {String}
 */
function sign({ params, secret, method = "SHA256" } = {} as { params: any, secret: string, method?: "SHA256" | "MD5" }) {
  if (!params || Object.keys(params).length === 0) {
    console.error("Params is required for signing")
    process.exit(1)
  }
  if (!secret) {
    console.error("Secret is required for signing")
    process.exit(1)
  }
  let arr = []
  Object.keys(params).sort().forEach(key => {
    if (params[key] !== '' && params[key] !== undefined && params[key] !== null) {
      arr.push(`${key}=${params[key].toString()}`)
    }
  })
  arr.push(secret)
  let strSign
  switch (method.toLocaleUpperCase()) {
    case "SHA256":
      strSign = crypto.createHash("SHA256").update(arr.join("&")).digest("hex").toString().toLocaleUpperCase()
      break
    case "MD5":
      strSign = crypto.createHash('md5').update(arr.join("&"), 'utf8').digest('hex').toString().toLocaleUpperCase()
      break
  }
  return strSign
}
const partnerId = getPartnerId()
const apiKey = getApiKey()
const baseUrl = getApiBaseUrl()

export async function callZydsoftApi({ module = "", params = {}, data = {}, method = "get" }: { module: string, params?: any, data?: any, method?: "get" | "post" }) {
  if (!module) {
    console.error("Module is required")
    process.exit(1)
  }
  const token = await getToken()
  if (!token) {
    console.error("Failed to get token")
    process.exit(1)
  }

  if (data && (data.length > 0 || Object.keys(data).length > 0)) {
    params.post_params = JSON.stringify(data)
  }
  params.timestamp = timestamp()
  params.sign = sign({ params, secret: token.token })
  delete params.post_params

  let res
  try {
    res = await fetch(`${baseUrl}/${module}?${new URLSearchParams(params)}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token.token}`
      },
      body: method.toLowerCase() === "get" ? null : JSON.stringify(data)

    })
  } catch (error) {
    console.error("Error calling Zydsoft API:", error)
    process.exit(1)
  }
  return res.json()
}

async function getToken() {
  const token = fs.existsSync('./token.json') ? JSON.parse(fs.readFileSync('./token.json', 'utf-8')) as Token : null
  if (!token) {
    return await getTokenNow()
  } else if (token.expiresIn - (new Date().getTime() / 1000 - new Date(token.createdAt).getTime() / 1000) <= 10) { //token时效小于10秒重新获取
    return await getTokenNow()
  }
  return token
}

async function getTokenNow() {
  const res = await fetch(`${baseUrl}/token?partnerId=${partnerId}&secret=${apiKey}&timestamp=${timestamp()}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (!res.ok) {
    console.error(`Failed to get token: ${res.status} ${res.statusText}`)
    process.exit(1)
  }

  const data = await res.json()
  if (!data.token) {
    console.error(`Failed to get token: ${data.message || 'Unknown error'}`)
    process.exit(1)
  }
  const newToken: Token = {
    partnerId,
    token: data.token,
    expiresIn: data.expiresIn,
    createdAt: new Date().toISOString()
  }
  fs.writeFileSync('./token.json', JSON.stringify(newToken, null, 2))
  return newToken
}
