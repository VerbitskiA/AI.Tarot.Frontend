export type TokensData = {
    accessToken: string
    refreshToken: string
}

export type LoginData = {
    tokens: TokensData
    userInfo: {
        userId: string
        username: string
        balance: number
    }
}

export type RevokeData = {
    refreshToken: string
}
