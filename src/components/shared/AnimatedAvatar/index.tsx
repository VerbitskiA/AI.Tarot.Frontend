import { FC, memo, useMemo } from "react"

import { Canvas } from "@react-three/fiber"
import Image from "next/image"
import Blob from "./blob"

import "./style.css"

export type SizeType = "small" | "medium" | "large"

type AnimatedAvatarProps = {
    imageSrc: string,
    size: SizeType,
}

const blockSizes = {
    "small": {
        value: 170,
        margin: 15,
        border: 4,
    },
    "medium": {
        value: 220,
        margin: 20,
        border: 4,
    },
    "large": {
        value: 372,
        margin: 32,
        border: 4,
    },
} as const

const getImgSize = (size: SizeType) => {
    // size includes x2 border (2 * 4)
    const sizeData = blockSizes[size]
    return sizeData.value - 2 * sizeData.margin
}

/* 
    animatedAvatar sizes:

        small   -   140 + 2 * 15 = 170
        medium  -   180 + 2 * 20 = 220
        large   -   308 + 2 * 32 = 372
*/

const AnimatedAvatar: FC<AnimatedAvatarProps> = ({imageSrc, size}) => {
    const sizeValue = useMemo(() => {
        return getImgSize(size)
    }, [size])

    return (
        <div className={`taroAvatar ${size}`}>
            <div className='taroAvatar__containerForAnimation'>
                <div className='taroAvatar__avatar avatar'>
                    <div className='avatar__imgBlock imgBlock'>
                        <Image
                            src={imageSrc}
                            alt="logo"
                            className="imgBlock__image"
                            width={sizeValue}
                            height={sizeValue}
                            priority={true}
                        />
                    </div>
                    <Canvas className="imgBlock__canvas" camera={{ position: [0.0, 0.0, 8.0] }}>
                        <Blob />
                    </Canvas>
                </div>
            </div>
        </div>
    )
}

export default memo(AnimatedAvatar)
