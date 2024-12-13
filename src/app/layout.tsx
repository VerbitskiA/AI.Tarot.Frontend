import AppProviders from '@/components/providers'
import type {Metadata} from 'next'
import {Rubik} from 'next/font/google'
import './globals.css'
import React from 'react'

const rubik = Rubik({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'AI Tarot',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
