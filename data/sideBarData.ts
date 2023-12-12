import {Activity, Home, Receipt, Settings, User, Zap} from "lucide-react";
import {ISideBarLink} from "@/interfaces/layout/ISideBarLink";

export const sideBarData: ISideBarLink[] = [
    {
        label: "home",
        value: "Home",
        path: "/home",
        icon: Home,
        color: "bg-red-300",
        subLinks: null
    },
    {
        label: "activity",
        value: "Activity",
        path: "/activity",
        icon: Activity,
        color: "bg-violet-300",
        subLinks: null
    },
    {
        label: "setting",
        value: "Setting",
        path: null,
        icon: Settings,
        color: "bg-zinc-300",
        subLinks: [
            {
                label: "account",
                value: "Account",
                path: "/setting/account",
                icon: User,
                color: "text-Slate-500",
                subLinks: null
            },
            {
                label: "plans",
                value: "plans",
                path: "/setting/plans",
                icon: Zap,
                color: "text-Slate-500",
                subLinks: null
            },
            {
                label: "billing",
                value: "Billing",
                path: "setting/billing",
                icon: Receipt,
                color: "bg-amber-300",
                subLinks: null
            }
        ]
    }
]