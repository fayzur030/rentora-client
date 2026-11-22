const configuredApiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BASE_URL

if (!configuredApiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

export const baseUrl = configuredApiUrl.replace(/\/+$/, '')
