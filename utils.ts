export function getApiKey(): string {
  const apiKey = process.env.ZYDSOFT_API_KEY
  if (!apiKey) {
    console.error("ZYDSOFT_API_KEY environment variable is not set")
    process.exit(1)
  }
  return apiKey
}

export function getPartnerId(): string {
  const partnerId = process.env.ZYDSOFT_PARTNERID
  if (!partnerId) {
    console.error("ZYDSOFT_PARTNERID environment variable is not set")
    process.exit(1)
  }
  return partnerId
}