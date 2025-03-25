export type LoginData = {
    tokens: {
        accessToken: string
        refreshToken: string
    }
    userInfo: {
        userId: string
        username: string
        balance: number
    }
}
