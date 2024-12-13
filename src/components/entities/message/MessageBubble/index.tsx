'use client'
import React, {useState} from 'react';
import {Avatar, Button, Modal, ModalBody, ModalContent, useDisclosure} from '@nextui-org/react';
import {Image} from "@nextui-org/image";
import BASE_URL from "@/configs/http-service/constants/baseUrl";
import {useMediaQuery} from "react-responsive";

interface MessageBubbleProps {
    message: string;
    isUser: boolean;
    userName?: string;
    images?: string[];
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser, userName, images }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const openModal = (image: string) => {
        console.log(image)
        setSelectedImage(image);
        console.log(selectedImage)
        onOpen();
    };

    const closeModal = () => {
        onClose();
        setSelectedImage(null);
    };

    return (
        <div className={`w-full flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-2`}>
        {isUser ? (
            <>
                <p className="text-medium font-semibold">{userName}</p>
                <div className="px-4 py-3 bg-[#27ACC9] max-w-[80%] rounded-tl-2xl rounded-b-3xl">
                    <p>{message}</p>
                </div>
            </>
        ) : (
            <>
                <div className="flex gap-2 items-center text-medium font-semibold">
                    <Avatar isBordered src="/avatar.png" className="w-6 h-6 ring-[#27ACC9]"/>
                    <p>Aita</p>
                </div>
                <div className="px-4 py-3 bg-[#343434] max-w-[80%] rounded-tr-2xl rounded-b-3xl">
                    <p className={'whitespace-pre-wrap break-words'}>{message}</p>
                </div>
                {!!images?.length &&
                    <div
                        className="px-3 py-3 bg-[#343434] gap-2 grid grid-cols-3 max-w-[80%] rounded-tr-2xl rounded-b-3xl">
                        {/* Левая фотография */}
                        <div className="col-span-2 aspect-[2/3]" onClick={() => openModal(images[0])}>
                            <Image
                                className="object-cover w-full h-full cursor-pointer"
                                src={BASE_URL + images[0]}
                                alt="Image 0"
                                removeWrapper
                                width={200}
                                height={300}
                            />
                        </div>

                        {/* Правая колонка с двумя фотографиями */}
                        <div className="grid grid-rows-2 gap-2 h-full">
                            {images.slice(1).map((image, index) => (
                                <div key={index + 1} className="aspect-[2/3]" onClick={() => openModal(image)}>
                                    <Image
                                        className="object-cover w-full h-full cursor-pointer"
                                        src={BASE_URL + image}
                                        alt={`Image ${index + 1}`}
                                        removeWrapper
                                        width={100}
                                        height={150}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                }

                <Modal
                    closeButton={
                        <Button onClick={() => closeModal} isIconOnly  radius={'full'} className={'bg-pink-900 p-0 h-[30px] w-[30px]'}>
                            <Image src={'/CloseIcon.svg'} height={10} width={10}/>
                        </Button>
                    }
                    isOpen={isOpen}
                    onClose={onClose}
                    size={'full'}
                    placement={'center'}
                    backdrop={'blur'}
                    classNames={{
                        'base': `${isDesktop ? 'w-full' : 'w-full'} shadow-none overflow-hidden bg-opacity-0`,
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalBody className={"p-0 w-full flex items-center justify-center"}>
                                    {selectedImage && (
                                        <Image
                                            src={BASE_URL + selectedImage}
                                            alt="Selected Image"
                                            width={isDesktop ? '30%' : '80%'}
                                            removeWrapper
                                            height={'80%'}
                                            className="rounded object-cover"
                                        />
                                    )}
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/*<div className="px-4 py-3 bg-[#343434] gap-2 grid grid-cols-2 max-w-[80vw] rounded-tr-2xl rounded-b-3xl">*/}
                {/*    {images && images.map((image, index) => (*/}
                {/*        <Image className={'object-cover'} key={index} src={BASE_URL + image} alt={`Image ${index}`} width={100} height={100} />*/}
                {/*    ))}*/}
                {/*</div>*/}
            </>
        )}
    </div>
    )
};

export default MessageBubble;
