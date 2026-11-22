import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public Route: All Equipments
  if (pathname === '/all-equipments') {
    return NextResponse.next()
  }

  // Get Session
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const user = session?.user

  // Authentication Check
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const role = user.role

  // Admin Dashboard Protection
  if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Owner Dashboard Protection
  if (pathname.startsWith('/dashboard/owner') && role !== 'owner') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Customer Dashboard Protection
  if (pathname.startsWith('/dashboard/customer') && role !== 'customer') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/all-equipments',
    '/all-equipments/:path*',
    '/dashboard/admin/:path*',
    '/dashboard/customer/:path*',
    '/dashboard/owner/:path*',
  ],
}
