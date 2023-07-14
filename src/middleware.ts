import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const pathCondition = path === "/login" || path === "/signup" || path === "/"
   const token = request.cookies.get("token")?.value || ""
   if (pathCondition && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  } else if (!pathCondition && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  } 
   return NextResponse.next()
}
 export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/profile/:id*',
    '/verifyMail'
  ]
}