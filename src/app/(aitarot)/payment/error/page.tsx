import React, {FC} from 'react'
import ImageBlock from "@/components/entities/Auth/ImageBlock";

const Page = async() => {
    return (
        <>
            <div className={'flex flex-col max-h-[calc(100dvh-58px)] h-full justify-center items-center'}>
                <ImageBlock imageSrc={'/onboard.png'}>
                    <h1 className={'text-3xl font-bold'}>Payment Error</h1>
                    <p className={'text-xl text-[#BEBEBE]'}>Something went wrong</p>
                </ImageBlock>
            </div>
        </>
    )
}

export default Page