import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  if (!req.cookies.get('b2d_anon')) {
    res.cookies.set('b2d_anon', uuidv4(), {
      maxAge: 60*60*24*365,
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    })
  }
  return res
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
