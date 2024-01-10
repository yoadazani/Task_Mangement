import {ReactNode} from 'react'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Toaster} from "react-hot-toast";
import NextAuthProvider from "@/context/NextAuthProvider";
import {ReactQueryProvider} from "@/context/ReactQueryProvider";
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'TaskOrganizer',
    description: 'The most popular and perfect tool for traking and organize yout tasks',
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <NextAuthProvider>
            <ReactQueryProvider>
                <html lang="en">
                <body className={inter.className}>
                {children}
                <Toaster position="top-center"/>
                </body>
                </html>
            </ReactQueryProvider>
        </NextAuthProvider>
    )
}
