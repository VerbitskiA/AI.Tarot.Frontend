import React from 'react'
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import { getDefaultAvatarSize, isLaptopOrDesktopMediaQuery } from '@/components/shared/helpers';
import { useMediaQuery } from 'react-responsive';

const Page = async() => {
    const isNotMobile = useMediaQuery(isLaptopOrDesktopMediaQuery)

    return (
        <>
            <div className={'flex flex-col max-h-[calc(100dvh-58px)] h-full justify-center items-center'}>
                <ImageBlock imageSrc={'/onboard.jpg'} avatarSize={getDefaultAvatarSize(isNotMobile)}>
                    <h1 className={'text-3xl font-bold'}>Payment Successful</h1>
                    <p className={'text-xl text-[#BEBEBE]'}>Thank you for your payment</p>
                </ImageBlock>
            </div>
        </>
    )
}

export default Page