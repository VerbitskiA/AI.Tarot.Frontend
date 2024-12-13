'use client'
import {NextUIProvider} from '@nextui-org/react'
import React from 'react'
import {ThemeProvider as NextThemesProvider} from "next-themes";


const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark" themes={['dark']}>
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    )
}

export default ThemeProvider