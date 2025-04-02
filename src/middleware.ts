import {NextRequest, NextResponse, NextMiddleware} from 'next/server'

export const config = {
    matcher: ['/((?!api|logos|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',]
}

export const middleware: NextMiddleware = async (req: NextRequest) => {
    const {
        pathname,
        // search,
        // origin,
    } = req.nextUrl
    const res = NextResponse.next({request: {...req}})

    console.log('-------------------- REQUEST FROM, ', pathname)
    return res
}
