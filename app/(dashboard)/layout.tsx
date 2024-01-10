"use client"

import {ReactNode, useEffect, useState} from 'react';
import {SideBar} from "@/components/layout/sidebar/SideBar";
import {NavBar} from "@/components/layout/NavBar";
import AcceptInvitation from "@/components/shared/AcceptInvitation";
import {useSession} from "next-auth/react";
import {userAlreadyInvited} from "@/services/actions/invitationActions";


export interface IHaveInvitation {
    hasInvitation: boolean
    invitationData: any
}

const DashboardLayout = ({children}: { children: ReactNode }) => {
    const {data: session} = useSession()
    const [invitation, setInvitation] = useState<IHaveInvitation>({} as IHaveInvitation)

    useEffect(() => {
        (async () => {
            const userEmail = session?.user?.email;
            if (!userEmail) return

            const haveInvitation = await userAlreadyInvited(userEmail)

            setInvitation({
                hasInvitation: !!haveInvitation,
                invitationData: haveInvitation
            })
        })()
    }, [session?.user?.email])

    return <div className="flex gap-3 md:gap-0 md:flex-row h-screen overflow-hidden">
        {
            invitation?.hasInvitation && <AcceptInvitation
                invitation={invitation}
                setInvitation={setInvitation}
            />
        }
        <div className="hidden h-full md:flex md:flex-col md:w-72 z-50">
            <SideBar/>
        </div>
        <main className="flex flex-col w-full h-screen max-h-screen">
            <NavBar/>
            <>{children}</>
        </main>
    </div>
}

export default DashboardLayout;