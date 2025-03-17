import { SizeType } from "./AnimatedAvatar"

const getDefaultAvatarSize = (isLaptopOrDesktop: boolean): SizeType => {

    return isLaptopOrDesktop ? 'large' : 'medium'
}

const isLaptopOrDesktopMediaQuery = { minWidth: 1024 }

export {
    getDefaultAvatarSize,
    isLaptopOrDesktopMediaQuery
}
