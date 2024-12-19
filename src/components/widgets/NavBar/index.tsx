'use client'
import {Avatar, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@nextui-org/react'
import {AlignJustify} from "lucide-react";
import React, {useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";
import {Image} from "@nextui-org/image";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import BackButton from "@/components/shared/BackButton";
import SideBar from "@/components/widgets/SideBar";


const NavBar = () => {
    const { configuration } = useConfiguration();
    const searchParams = useSearchParams()

    const pathname = usePathname();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const showSidebar = () => setSidebarVisible(true);

    const getNavItem = () => {
        switch(pathname) {
            case '/':
            case '/chat/new':
                return <div className={'text-medium sm:text-lg flex items-center gap-1 bg-[#2A2A2A] hover:bg-[#3b3b39] transition-colors cursor-pointer h-[40px] rounded-3xl px-3 py-1.5'}>
                    <p className={'flex items-end justify-end'}>{configuration?.currentUser.balance}</p>
                    <Image src={'/oracle-icon.svg'} height={22} width={24}/>
                </div>
            case '/auth/register':
            case '/auth/approve-email':
            case '/auth/reset-password':
            case '/auth/new-password':
                return <Link href={'/auth'} className={'font-bold text-[#27ACC9] hover:text-[#32cbed] transition-colors text-sm sm:text-lg'}>Log in</Link>
            case '/auth/onboard':
                return <Link href={'/auth'} className={'font-bold text-[#27ACC9] hover:text-[#32cbed] transition-colors hidden sm:flex text-sm sm:text-lg'}>Log in</Link>
            case '/auth':
                return <Link href={'/auth/register'} className={'font-bold text-[#27ACC9] hover:text-[#32cbed] transition-colors text-sm sm:text-lg'}>Sign up</Link>
            default:
                return null
        }
    }

    return (
        <>
            <Navbar className={`z-50 bg-opacity-0 ${pathname === '/' ? 'lg:hidden' : ''}`} isBlurred={false} height={'58px'} maxWidth={'full'} classNames={{
                item: [
                    "items-center",
                    "backdrop-opacity-10",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                ],
                wrapper: [
                    'px-2'
                ]
            }}>
                <NavbarBrand className={'w-full items-center pl-2 gap-3'}>
                    <BackButton/>
                    {pathname === '/chat/new' ?
                        <div
                            className={'flex gap-1.5 items-center text-xl font-semibold'}>
                            <Avatar isBordered className="w-9 h-9 text-tiny"
                                    src={'/avatar.png'}
                                    classNames={{
                                        base: 'ring-offset-0 ring-[#27ACC9]'
                                    }}
                            />
                            <p>Aita</p>
                        </div>
                        :
                        null
                    }
                    {searchParams.has('chatDate') ?
                        <p className={'text-xl font-semibold'}>Chat from {searchParams.get('chatDate')}</p>
                        :
                        null
                    }
                </NavbarBrand>
                <NavbarContent className={`${pathname !== '/auth/onboard' ? 'hidden' : 'flex sm:hidden'}`} justify="center">
                    <NavbarItem>
                        <p className={'text-xl sm:text-3xl text-center font-semibold'}>Aita, ai tarologist</p>
                        <div
                            className={'w-full flex gap-1 text-[#BEBEBE] items-center justify-center text-center text-xs sm:text-medium  font-normal'}>
                            <div className={'bg-[#14B411] rounded-full w-2 h-2'}></div>
                            Always online to help you find answers
                        </div>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end" className={'lg:pr-7 lg:pt-6 gap-2'}>
                    <NavbarItem>
                        {getNavItem()}
                    </NavbarItem>
                    <NavbarItem>
                        <Button isIconOnly
                                className={'flex items-center justify-center bg-[rgba(69,69,69,0.5)] backdrop-blur-2xl rounded-full h-10 w-10'}
                                onClick={showSidebar}>
                            <AlignJustify strokeWidth={1.5} className="text-white h-5 w-7"/>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <SideBar
                open={sidebarVisible}
                setOpen={setSidebarVisible}
            />
        </>

    )
};

export default NavBar;