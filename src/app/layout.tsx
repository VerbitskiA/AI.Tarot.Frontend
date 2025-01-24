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
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png'
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
			<Script id="google-analytics" strategy="afterInteractive">
				{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-JDLGQM4N11');
				`}
			</Script>

			{/* Google Analytics Script */}
			<Script type="text/javascript">
				{`
					(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();
					for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
					k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

					ym(99624370, "init", {
						clickmap:true,
						trackLinks:true,
						accurateTrackBounce:true
					});
			`}
			</Script>
			<noscript>
				<div>
					<img src={`https://mc.yandex.ru/watch/99624370`}
							 style={{ position:'absolute', left: '-9999px' }}
							 alt="" />
				</div>
			</noscript>
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
