import { SizeType } from "./AnimatedAvatar"

const getDefaultAvatarSize = (isLaptopOrDesktop: boolean): SizeType => {

    return isLaptopOrDesktop ? 'large' : 'medium'
}

const getDefaultAvatarSizeNew = (isMaxHeight767: boolean, isMaxHeight1023: boolean): SizeType => {

    let avatarSize: SizeType
    
    if (isMaxHeight767) {
        avatarSize = "small"
    }
    else if (isMaxHeight1023) {
        avatarSize = "medium"
    }
    else {
        avatarSize = "large"
    }

    return avatarSize
}

const isLaptopOrDesktopMediaQuery = { minWidth: 1024 } /* iPad Mini (1024x768) */

const isMaxHeight767MediaQuery = { maxHeight: 767 } /* iPad Mini (1024x768) */
const isMaxHeight1023MediaQuery = { maxHeight: 1023 } /* iPad Pro (1024x1366) */

export {
    getDefaultAvatarSize,
    getDefaultAvatarSizeNew,
    isLaptopOrDesktopMediaQuery,
    isMaxHeight767MediaQuery,
    isMaxHeight1023MediaQuery
}
