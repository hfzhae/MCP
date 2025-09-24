import fs from 'fs'
import dotenv from 'dotenv'
import crypto from 'crypto'
import assert from "assert"
dotenv.config({ path: './.env' })

interface Token {
  partnerId: string
  token: string
  expiresIn: number
  createdAt: string
}
function getApiKey(): string {
  const apiKey = process.env.ZYDSOFT_API_KEY || ""
  assert(apiKey, "ZYDSOFT_API_KEY environment variable is not set")
  return apiKey
}

function getPartnerId(): string {
  const partnerId = process.env.ZYDSOFT_PARTNERID || ""
  assert(partnerId, "ZYDSOFT_PARTNERID environment variable is not set")
  return partnerId
}

function getApiBaseUrl(): string {
  const baseUrl = process.env.ZYDSOFT_API_BASEURL || "https://c.zydsoft.cn/open/v2/api"
  assert(baseUrl.startsWith("http://") || baseUrl.startsWith("https://"), "ZYDSOFT_API_BASEURL must start with http:// or https://")
  return baseUrl
}

function timestamp() { return Math.floor(Date.now() / 1000) }
/**
 * 签名方法 SHA256 / MD5
 * @param {Object} params
 * @returns {String}
 */
function sign({ params, secret, method = "SHA256" } = {} as { params: any, secret: string, method?: "SHA256" | "MD5" }) {
  assert(method === "SHA256" || method === "MD5", "Method must be 'SHA256' or 'MD5'")
  assert(params && typeof params === "object", "Params must be an object")
  assert(secret && typeof secret === "string", "Secret must be a string")
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

export async function callZydsoftApi({ module = "", params = {}, data = {}, method = "get" }: { module: string, params?: any, data?: any, method?: "get" | "post" }) {
  assert(method.toLowerCase() === "get" || method.toLowerCase() === "post", "Method must be 'get' or 'post'")
  assert(params && typeof params === "object", "Params must be an object")
  assert(module, "Module must be a string")
  const token = await getToken()
  assert(token, "Failed to get token")
  if (data && (data.length > 0 || Object.keys(data).length > 0)) {
    params.post_params = JSON.stringify(data)
  }
  params.timestamp = timestamp()
  params.sign = sign({ params, secret: token.token })
  delete params.post_params

  let res
  data = method.toLowerCase() === "get" ? null : JSON.stringify(data)
  try {
    res = await fetch(`${baseUrl}/${module}?${new URLSearchParams(params)}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token.token}`
      },
      body: data
    })
  } catch (error) {
    assert(false, "Failed to connect to Zydsoft API")
  }
  const result = await res.json()
  assert(result, "No response from Zydsoft API")
  assert(res.status === 200, `Zydsoft API error: ${result.message || 'Unknown error'}`)
  return result
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
  assert(res.ok, `Failed to get token: ${res.status} ${res.statusText}`)
  const data = await res.json()
  assert(data.token, `Failed to get token: ${data.message || 'Unknown error'}`)
  const newToken: Token = {
    partnerId,
    token: data.token,
    expiresIn: data.expiresIn,
    createdAt: new Date().toISOString()
  }
  fs.writeFileSync('./token.json', JSON.stringify(newToken, null, 2))
  return newToken
}

const partnerId = getPartnerId()
const apiKey = getApiKey()
const baseUrl = getApiBaseUrl()