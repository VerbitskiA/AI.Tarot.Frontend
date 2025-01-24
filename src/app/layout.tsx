import AppProviders from '@/components/providers'
import type {Metadata} from 'next'
import {Rubik} from 'next/font/google'
import './globals.css'
import React from 'react'
import Script from 'next/script';

const rubik = Rubik({subsets: ['latin']})

export const metadata: Metadata = {
	title: 'AI Tarot',
	icons: {
		icon: '/favicon.ico', // путь к вашему favicon
		shortcut: '/favicon.ico', // для добавления ярлыка
		apple: '/apple-touch-icon.png' // для устройств Apple
	}
}

export default function RootLayout({
																		 children
																	 }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<head>
			<meta name="google-site-verification" content="1TbY-NR0RN_A1wSxmcN7ceEAJU7lEWvYdUTEP2saecE"/>


			{/* Google Analytics Script */}
			<Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-JDLGQM4N11"/>
			<Script strategy="afterInteractive">
				{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-JDLGQM4N11');
				`}
			</Script>
		</head>
		<body className={rubik.className}>
		<AppProviders>
			<>
				{children}
			</>
		</AppProviders>

		</body>
		</html>
	)
}
