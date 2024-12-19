import {Image} from "@nextui-org/image";
import React, {FC} from "react";

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

            <div className="relative flex justify-center items-center">
                <Image
                    src={imageSrc}
                    alt="logo"
                    width={isMainPage ? 320 : 280}
                    height={isMainPage ? 320 : 280}
                    classNames={{
                        img: ["backdrop-blur-xs z-10"],
                        wrapper: [
                            "rounded-full shadow-[#22879D] shadow-[0_0_25px_1px_rgba(0,0,0,0.3)] mt-4 sm:mt-0 bg-opacity-55 bg-[#22879D] relative",
                        ],
                    }}
                    style={{
                        width: "50vw",
                        maxWidth: isMainPage ? "320px" : "280px",
                        height: "auto",
                        transition: "width 0.5s ease-in-out",
                    }}
                />
            </div>
            {children && <div className={'w-full flex flex-col gap-2'}>{children}</div>}
        </div>
    )
}

export default ImageBlock