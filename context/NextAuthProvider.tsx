"use client"

import { SessionProvider } from "next-auth/react"
import {ReactNode} from "react";
import {Session} from "next-auth";
export default function NextAuthProvider({children}: {children: ReactNode}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
