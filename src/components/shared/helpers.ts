import { SizeType } from "./AnimatedAvatar"

const getDefaultAvatarSize = (isLaptopOrDesktop: boolean): SizeType => {

    return isLaptopOrDesktop ? 'large' : 'medium'
}

type EndPoint = {
    value: boolean
    size: SizeType
}

const getAvatarSize = (endpoints: EndPoint[], minSize: SizeType): SizeType => {
    let avatarSize: SizeType = minSize

    for(const endpoint of endpoints) {
        if (endpoint.value) {
            avatarSize = endpoint.size
            break
        }
    }

    return avatarSize
}

const isLaptopOrDesktopMediaQuery = { minWidth: 1024 } /* iPad Mini (1024x768) */

const isMinHeight669MediaQuery = { minHeight: 669 } /* iPhone 12 Pro lvh height - 669px */
const isMinHeight768MediaQuery = { minHeight: 768 } /* iPad Mini (1024x768) */
const isMinHeight1024MediaQuery = { minHeight: 1024 } /* iPad Pro (1024x1366) */

export {
    getDefaultAvatarSize,
    getAvatarSize,
    isLaptopOrDesktopMediaQuery,
    isMinHeight669MediaQuery,
    isMinHeight768MediaQuery,
    isMinHeight1024MediaQuery
}
