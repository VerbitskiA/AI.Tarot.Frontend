import {TOKENS_KEYS} from '@/configs/http-service/constants/authTokens'
import {NextRequest, NextResponse} from 'next/server'

export async function middleware(req: NextRequest) {
    const {
        pathname,
        search,
        origin,
    } = req.nextUrl
    const res = NextResponse.next({request: {...req}})
    // res.headers.append('Access-Control-Allow-Credentials', "true")
    // res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    // res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    // res.headers.append(
    //     'Access-Control-Allow-Headers',
    //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )

    console.log('-------------------- REQUEST FROM, ', pathname)
    return res
}

export const config = {
    matcher: ['/((?!api|logos|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',],
    // matcher: ['/((?!_next/static|_next/image|logos/*|favicon.ico).*)'],
}