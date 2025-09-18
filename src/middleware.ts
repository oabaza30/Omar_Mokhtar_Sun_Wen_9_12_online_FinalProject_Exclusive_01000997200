import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const cookieName = process.env.NODE_ENV === 'production' ? '_Secure-next-auth.session-token' : 'next-auth.session-token';
    const token = await getToken({ req: request, cookieName })
    const { pathname } = request.nextUrl

    const authRoutes = ['/login', '/register']
    const protectedRoutes = ['/cart', '/checkout', '/profile']

    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!token && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/cart', '/checkout', '/profile', '/login', '/register'],
}
