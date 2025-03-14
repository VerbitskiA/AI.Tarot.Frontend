const getDefaultAvatarSize = (isNotMobile: boolean) => isNotMobile ? 'large' : 'medium'

const isNotMobileMediaQuery = { minWidth: 1024 }

export {
    getDefaultAvatarSize,
    isNotMobileMediaQuery
}
