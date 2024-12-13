type ConfigurationType = {
    "version": string,
    "currentUser": {
        "isAuthenticated": boolean,
        "username": string,
        "balance": number,
        "gender": string,
        "isBlocked": boolean,
        "isEmailConfirmed": boolean
    }
}

export type {
    ConfigurationType
}
