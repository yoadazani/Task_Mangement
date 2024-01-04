"use client"

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/layout/UserAvatar";
import {useSession} from "next-auth/react";
import {ButtonLoader} from "@/components/shared/ButtonLoader";
import {getUserFallback} from "@/utiles/getUserFallback";
import {userMenuData} from "@/data/userMenuData";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

export const UserMenu = () => {
    const router = useRouter()
    const {data: session, status} = useSession();

    const userFB = getUserFallback(session?.user?.name!)

    const handleLogout = async () => {
        return await signOut({callbackUrl: "/"});
    }

    if (status === "loading") return <ButtonLoader />

    if (!session) return null
    return <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
            <UserAvatar img={session?.user?.image!} fb={userFB}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px]">
            <DropdownMenuLabel>
                <h2 className="font-bold px-2.5">My Account</h2>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userMenuData.map((item) => (
                <DropdownMenuItem
                    key={item.label}
                    className="space-x-3 cursor-pointer hover:bg-zinc-200"
                    onClick={() => item.link ? router.push(item.link) : handleLogout()}
                >
                    <item.icon className="w-5 h-5"/>
                    <span className="text-zinc-500 hover:text-zinc-700">{item.value}</span>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
}