import { NextRequest, NextResponse, MiddlewareConfig } from 'next/server'

import { jwtDecode } from 'jwt-decode'

const publicRoutes = [
  { path: '/sign-in', whenAuthenticated: 'redirect' },
  { path: '/sign-up', whenAuthenticated: 'redirect' },
  { path: '/forgot-password', whenAuthenticated: 'redirect' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'
const HOME_ROUTE = '/'

interface JwtPayload {
  exp: number
  iat?: number
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authToken = request.cookies.get('token')?.value

  if (path.startsWith('/reset-password/')) {
    const resetToken = path.split('/')[2]

    if (!resetToken)
      return NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url),
      )

    try {
      const decoded = jwtDecode<JwtPayload>(resetToken)
      const isExpired = decoded.exp < Date.now() / 1000

      if (isExpired) {
        const redirectUrl = new URL(
          REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE,
          request.url,
        )

        return NextResponse.redirect(redirectUrl)
      }
    } catch {
      return NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url),
      )
    }

    return NextResponse.next()
  }

  const isPublicRoute = publicRoutes.some((route) =>
    path.startsWith(route.path),
  )

  if (authToken) {
    try {
      const decoded = jwtDecode<JwtPayload>(authToken)
      const isExpired = decoded.exp < Date.now() / 1000

      if (isExpired) {
        const response = NextResponse.redirect(
          new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url),
        )
        response.cookies.delete('token')

        return response
      }

      if (isPublicRoute)
        return NextResponse.redirect(new URL(HOME_ROUTE, request.url))
    } catch {
      const response = NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url),
      )
      response.cookies.delete('token')

      return response
    }
  }

  if (!authToken && !isPublicRoute)
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url),
    )

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
