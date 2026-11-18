import { authClient } from '@/lib/auth-client'

export const getSessionFromClient = () => {
  const { data: session, isPending } = authClient.useSession()

  return {
    session,
    user: session?.user,
    isPending,
  }
}
