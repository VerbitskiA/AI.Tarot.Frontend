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
    switch (size) {
        case "small":
            return 132
        case "medium":
            return 180
        case "large":
            return 308
        default:
            return 180
    }
}

const AnimatedAvatar: FC<AnimatedAvatarProps> = ({imageSrc, size}) => {
    const sizeValue = useMemo(() => {
        return getSize(size)
    }, [size])

    return (
        <div className={`avatar ${size}`}>
            <div className='avatar__container'>
                <div className='animatedAvatar'>
                    <div className='animatedAvatar__imgBlock imgBlock'>
                        <Image
                            src={imageSrc}
                            alt="logo"
                            className="imgBlock__image"
                            width={sizeValue}
                            height={sizeValue}
                        />
                    </div>
                    <Canvas className="block" camera={{ position: [0.0, 0.0, 8.0] }}>
                        <Blob />
                    </Canvas>
                </div>
            </div>
        </div>
    )
}

export default memo(AnimatedAvatar)
