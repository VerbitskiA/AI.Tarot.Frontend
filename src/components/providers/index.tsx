import ThemeProvider from '@/components/providers/NextUiProvider'
import React from 'react'
import {Toaster} from 'sonner'
import {ConfigurationProvider} from "@/components/providers/ConfigurationProvider";

const AppProviders = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <ThemeProvider>
                <ConfigurationProvider>
                    <Toaster />
                    {children}
                </ConfigurationProvider>
            </ThemeProvider>
        </>
    )
}

export default AppProviders