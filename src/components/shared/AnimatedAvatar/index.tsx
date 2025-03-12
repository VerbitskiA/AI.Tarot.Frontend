import { FC } from "react"

import { memo } from "react"
import { Canvas } from "@react-three/fiber"
import Image from "next/image"
import Blob from "./blob"

import "./style.css"

type SizeType = "small" | "medium" | "large"

type AnimatedAvatarProps = {
    imageSrc: string,
    sideLength: number,
    size: SizeType,
}

const AnimatedAvatar: FC<AnimatedAvatarProps> = ({imageSrc, sideLength, size}) => {

    return (
        <div className={`avatar ${size}`}>
            <div className='avatar__container'>
                <div className='animatedAvatar'>
                    <div className='animatedAvatar__imgBlock imgBlock'>
                        <Image
                            src={imageSrc}
                            alt="logo"
                            className="imgBlock__image"
                            width={sideLength}
                            height={sideLength}
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
