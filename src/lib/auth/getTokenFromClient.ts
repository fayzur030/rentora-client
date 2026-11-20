import { authClient } from '@/lib/auth-client'

export async function getTokenFromClient() {
  try {
    const result = await authClient.token()

    return result.data?.token || null
  } catch (error) {
    console.error('Get Token Error:', error)
    return null
  }
}
