import React, {FC} from "react";
import AnimatedAvatar from "@/components/shared/AnimatedAvatar";

type Props = {
    children?: React.ReactNode,
    imageSrc: string,
    isMainPage?: boolean
}

const ImageBlock: FC<Props> = ({children, imageSrc, isMainPage}) => {
    
    return (
        <div className="w-full flex flex-col gap-4 justify-center items-center text-center relative">

            <div className="z-10 flex-col gap-2 hidden sm:flex">
                <p className={`text-xl ${isMainPage ? "sm:text-2xl" : "sm:text-3xl"} font-semibold`}>
                    Aita, ai tarologist
                </p>
                <div
                    className={`w-full flex gap-1 text-[#BEBEBE] items-center justify-center text-center text-xs ${
                        !isMainPage ? "sm:text-medium" : ""
                    } font-normal`}
                >
                    <div className="bg-[#14B411] rounded-full w-2 h-2"></div>
                    Always online to help you find answers
                </div>
            </div>

            <div className="flex justify-center items-center">
                <AnimatedAvatar imageSrc={imageSrc} size={isMainPage ? "large" : "medium"}/>
            </div>
            {children && <div className={'w-full flex flex-col gap-2'}>{children}</div>}
        </div>
    )
}

export default ImageBlock