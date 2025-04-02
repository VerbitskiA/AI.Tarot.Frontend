import { JWT, encode, getToken } from 'next-auth/jwt'
import {NextRequest, NextResponse, NextMiddleware} from 'next/server'
import BASE_URL from './configs/http-service/constants/baseUrl';
import { TokensData } from './lib/types/responsesData';

export const config = {
    matcher: ['/((?!api|logos|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',]
}

async function refreshAccessToken(token: JWT): Promise<TokensData | undefined> {
	const {accessToken, refreshToken} = token.user.tokens

	if (accessToken && refreshToken) {
		try {
			const res = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
				method: "POST",
				credentials: "include",
				body: JSON.stringify({refreshToken: refreshToken}),
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
			})

			if (res.ok) {
				const data = await res.json() as unknown as TokensData

				return data
			}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return undefined
		}
	}
}

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
	? '__Secure-next-auth.session-token'
	: 'next-auth.session-token'

function signOut(request: NextRequest) {
	const response = NextResponse.redirect(new URL('/api/auth/signin', request.url))

	request.cookies.getAll().forEach((cookie) => {
		if (cookie.name.includes('next-auth.session-token')) response.cookies.delete(cookie.name)
	})

  return response;
}

function shouldUpdateToken(token: JWT): boolean {
	// console.log("token exp", token.exp)
	// console.log("Date.now() / 1000", Date.now() / 1000)
	if (token.exp < Date.now() / 1000) {
		return true
	}

  	return false
}

export const middleware: NextMiddleware = async (req: NextRequest) => {
	const token = await getToken({ req })

  	if (!token) return signOut(req)

	const response = NextResponse.next()

	if (shouldUpdateToken(token)) {
		const newTokens = await refreshAccessToken(token)

		if (newTokens) {
			const newSessionToken = await encode({
				secret: process.env.NEXTAUTH_SECRET as string,
				token: {
				...token,
				tokens: newTokens,
				} as JWT,
				maxAge: 30 * 24 * 60 * 60,
			})

			const size = 3933 // maximum size of each chunk
			const regex = new RegExp('.{1,' + size + '}', 'g')

			// split the string into an array of strings
			const tokenChunks = newSessionToken.match(regex)

			if (tokenChunks) {
				tokenChunks.forEach((tokenChunk, index) => {
					response.cookies.set(`${sessionCookie}.${index}`, tokenChunk)
				})
			}
		}
	}

    const {
        pathname,
        // search,
        // origin,
    } = req.nextUrl
    const res = NextResponse.next({request: {...req}})

    console.log('-------------------- REQUEST FROM, ', pathname)

    return res
}
