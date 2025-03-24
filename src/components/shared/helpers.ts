import { SizeType } from "./AnimatedAvatar"

const getDefaultAvatarSize = (isLaptopOrDesktop: boolean): SizeType => {

    return isLaptopOrDesktop ? 'large' : 'medium'
}

const isLaptopOrDesktopMediaQuery = { minWidth: 1024 } /* iPad Mini (1024x768) */

export {
    getDefaultAvatarSize,
    isLaptopOrDesktopMediaQuery
}
