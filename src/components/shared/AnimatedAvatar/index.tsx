import { FC, memo, useMemo } from "react"

import { Canvas } from "@react-three/fiber"
import Image from "next/image"
import Blob from "./blob"

import "./style.css"

type SizeType = "small" | "medium" | "large"

type AnimatedAvatarProps = {
    imageSrc: string,
    size: SizeType,
}

const getSize = (size: SizeType) => {
    // size includes x2 border (2 * 4)
    switch (size) {
        case "small":
            return 140
        case "medium":
            return 180
        case "large":
            return 308
        default:
            return 180
    }
}

/* 
    animatedAvatar sizes:

        small   -   140 + 2 * 15 = 170
        medium  -   180 + 2 * 20 = 220
        large   -   308 + 2 * 32 = 372
*/

const AnimatedAvatar: FC<AnimatedAvatarProps> = ({imageSrc, size}) => {
    const sizeValue = useMemo(() => {
        return getSize(size)
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
