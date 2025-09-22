import { DiseaseGuide } from "./interface.js"
export async function diseaseGuide({ find }: DiseaseGuide) { }

export function getApiKey(): string {
  const apiKey = process.env.ZYDSOFT_API_KEY;
  if (!apiKey) {
    console.error("ZYDSOFT_API_KEY environment variable is not set");
    process.exit(1);
  }
  return apiKey;
}