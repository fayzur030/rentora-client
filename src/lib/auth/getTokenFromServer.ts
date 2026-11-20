import 'server-only'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function getTokenFromServer() {
  try {
    const result = await auth.api.getToken({
      headers: await headers(),
    })

    return result.token
  } catch (error) {
    console.error('Get Token Error:', error)
    return null
  }
}
