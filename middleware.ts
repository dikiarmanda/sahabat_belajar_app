import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register']
  const isPublicRoute = publicRoutes.some((route) => pathname === route)

  // Auth routes (login, register)
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')

  // Dashboard routes (protected)
  const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')

  // If accessing auth routes while logged in, redirect to dashboard
  if (isAuthRoute) {
    const session = await getSession()
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // If accessing dashboard routes without session, redirect to login
  if (isDashboardRoute) {
    const session = await getSession()
    if (!session) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
