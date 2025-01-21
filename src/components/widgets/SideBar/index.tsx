'use client'

import React, {FC, SetStateAction, useState} from "react";
import {Image} from "@nextui-org/image";
import {Button, cn} from "@nextui-org/react";
import {X} from "lucide-react";
import Link from "next/link";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import LogoutButton from "@/components/shared/LogoutButton";
import {useRouter} from "next/navigation";
import ModalComponent from '@/components/shared/ModalComponent';

interface Props {
	open: boolean,
	setOpen: React.Dispatch<SetStateAction<boolean>>,
}


const SideBar: FC<Props> = ({open, setOpen}) => {
	const {configuration} = useConfiguration();
	const router = useRouter()
	const hideSidebar = () => setOpen(false);
	const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);
	const howItWorksClick = () => {

		setHowItWorksModalOpen(true);
	};

	const howItWorksInnerButtonClick = () => {
		hideSidebar();
		setHowItWorksModalOpen(false);
		router.push('/auth/register');
	};
	return (
		<>
			{open && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={hideSidebar}
				/>
			)}

			<ul
				className={`fixed top-0 right-0 z-50 px-4 h-screen w-72 lg:w-[460px] bg-[#161E2C] flex flex-col gap-2 items-start transition-transform transform ${
					open ? 'translate-x-0' : 'translate-x-full'
				}`}>
				<li
					className={`w-full flex lg:pt-7 pt-2 lg:pr-4 ${configuration?.currentUser.isAuthenticated ? 'justify-between' : 'justify-end'} items-center lg:justify-end`}>
					{configuration?.currentUser.isAuthenticated &&
						<div className={'w-full'}>
							<div onClick={() => router.push('/buy/oracles')}
									 className={'text-medium lg:hidden w-fit ml-2 sm:text-lg flex items-center gap-1 bg-[#2A2A2A] hover:bg-[#3b3b39] transition-colors cursor-pointer h-[40px] rounded-3xl px-4 py-1.5'}>
								<p className={'flex items-end justify-end'}>{configuration?.currentUser.balance} Oracles</p>
								<Image src={'/oracle-icon.svg'} height={22} width={24}/>
							</div>
						</div>
					}
					<Button isIconOnly className={'h-10 w-10 flex justify-center bg-[#161E2C] items-center'}
									onClick={hideSidebar}>
						<X strokeWidth={1.7} className="text-[#c4c4c4] hover:text-[#ffffff] transition-colors h-8 w-8"/>
					</Button>
				</li>
				<div className={'flex flex-col gap-4'}>
					{configuration?.currentUser.isAuthenticated ?
						<>
							<div className={'flex flex-col gap-1'}>
								<li onClick={hideSidebar}
										className="w-full pl-2 font-semibold text-xl text-[#27ACC9] hover:text-[#32cbed] transition-colors">
									<Link href={'/buy/oracles'} className={''}>
										Add oracles
									</Link>
								</li>
								<li onClick={hideSidebar} className="w-fit hidden lg:flex">
									<div onClick={() => router.push('/buy/oracles')}
											 className={'text-medium sm:text-lg flex items-center gap-1 bg-[#2A2A2A] hover:bg-[#3b3b39] transition-colors h-[40px] cursor-pointer rounded-3xl px-3 py-1.5'}>
										<p className={'flex items-end justify-end'}>{configuration?.currentUser.balance}</p>
										<Image src={'/oracle-icon.svg'} height={22} width={24}/>
									</div>
								</li>
							</div>
							<li onClick={hideSidebar} className="w-full font-light text-xl">
								<LogoutButton/>
							</li>
						</>
						:
						<>
							<li onClick={hideSidebar}
									className="w-full font-semibold text-xl text-[#27ACC9] hover:text-[#32cbed] transition-colors ">
								<Link href={'/auth'}>
									Login
								</Link>
							</li>
							<li onClick={hideSidebar}
									className="w-full font-semibold text-xl text-[#27ACC9] hover:text-[#32cbed] transition-colors ">
								<Link href={'/auth/register'}>
									Create Account
								</Link>
							</li>
							<li className="w-full font-light text-xl">
								<a href={'../privacy-policy'} className="w-full text-[#c4c4c4] hover:text-[#ffffff] transition-colors">
									Aita
								</a>
							</li>
							<li className="w-full font-light text-xl">
								<a href="#" onClick={(e) => {
									e.preventDefault();
									howItWorksClick();
								}} className="w-full text-[#c4c4c4] hover:text-[#ffffff] transition-colors">
									How it works?
								</a>
							</li>
						</>
					}
					<li className="w-full font-light text-sm">
						<a href={'../privacy-policy'} className="w-full text-[#c4c4c4] hover:text-[#ffffff] transition-colors">
							Privacy policy
						</a>
					</li>
					<li className="w-full font-light text-sm">
						<a href={'../privacy-policy'} className="w-full text-[#c4c4c4] hover:text-[#ffffff] transition-colors">
							Terms of Service
						</a>
					</li>
					<li className="w-full font-light text-sm">
						<a href={'../privacy-policy'} className="w-full text-[#c4c4c4] hover:text-[#ffffff] transition-colors">
							Refund Policy
						</a>
					</li>

					<li className="w-full font-light text-xl pt-7">
						<a href="mailto:support@aitarot.io"
							 className="w-full text-[#c4c4c4] hover:text-[#ffffff] transition-colors">support@aitarot.io</a>
					</li>
				</div>
			</ul>
			{howItWorksModalOpen &&
				<ModalComponent
					open={howItWorksModalOpen}
					modalSize={'md'}
					setOpen={setHowItWorksModalOpen}
				>
					<div className={'flex flex-col gap-8'}>
						<p>
							I am Aita, an <span className={'font-bold'}>AI tarot reader developed with the guidance of many real-life tarot readers</span>.
							I work almost like a human, offering interpretations, insights, and advice just as they would.
						</p>
						<p>
							<span className={'font-bold'}>Here’s how it works:</span>
							<ol type={'1'} className={'list-decimal pl-6'}>
								<li>
									Write your question in the text field below ✍️
								</li>
								<li>
									I’ll provide you with:
								</li>
								<ul className={'list-disc pl-5'}>
									<li>A detailed tarot spread with the interpretation 🃏</li>
									<li>Card photos 📸</li>
								</ul>
							</ol>
						</p>
						<p>
							✨ <span className={'font-bold'}>Special Offer!</span>
							Your first tarot reading is a gift from me — <span
							className={'font-bold'}>absolutely free</span>.
							Experience the magic without any commitment! 🌟
						</p>
					</div>
					<div className={'pt-2 pb-4 w-full items-center'}>
						<Button size={'lg'}
										className={cn(`flex w-full items-center gap-2 sticky shadow-button bg-[#27ACC9] data-[hover=true]:bg-[#32cbed] h-[60px] font-semibold text-xl rounded-[60px]`)}
										type={'button'}
										onClick={howItWorksInnerButtonClick}
						>
							Ask question for free
						</Button>
					</div>
				</ModalComponent>
			}
		</>
	)
}

export default SideBar;