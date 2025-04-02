import ThemeProvider from '@/components/providers/NextUiProvider'
import React from 'react'
import {Toaster} from 'sonner'
import {ConfigurationProvider} from "@/components/providers/ConfigurationProvider";
import SessionProvider from './SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils';

const AppProviders = async ({children}: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions)

    return (
        <SessionProvider session={session}>
            <ThemeProvider>
                <ConfigurationProvider>
                    <Toaster />
                    {children}
                </ConfigurationProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}

export default AppProviders
