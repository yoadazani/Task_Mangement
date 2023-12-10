import {ReactNode} from 'react'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {Toaster} from "react-hot-toast";
import NextAuthProvider from "@/context/auth/NextAuthProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {
    return (
        <NextAuthProvider>
            <html lang="en">
            <body className={inter.className}>
            {children}
            <Toaster position="top-center"/>
            </body>
            </html>
        </NextAuthProvider>
    )
}
