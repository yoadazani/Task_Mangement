import {Activity, LayoutDashboard, Receipt, Settings, User, Zap} from "lucide-react";
import {ISideBarLink} from "@/interfaces/layout/ISideBarLink";

export const sideBarData: ISideBarLink[] = [
    {
        label: "home",
        value: "Dashboard",
        path: "/home",
        icon: LayoutDashboard,
        color: "bg-red-200",
        subLinks: null
    },
    {
        label: "activity",
        value: "Activity",
        path: "/activity",
        icon: Activity,
        color: "bg-violet-200",
        subLinks: null
    },
    {
        label: "setting",
        value: "Setting",
        path: null,
        icon: Settings,
        color: "bg-zinc-200",
        subLinks: [
            {
                label: "account",
                value: "Account",
                path: "/setting/account",
                icon: User,
                color: "bg-slate-200",
                subLinks: null
            },
            {
                label: "plans",
                value: "plans",
                path: "/setting/plans",
                icon: Zap,
                color: "bg-orange-200",
                subLinks: null
            },
            {
                label: "billing",
                value: "Billing",
                path: "setting/billing",
                icon: Receipt,
                color: "bg-amber-200",
                subLinks: null
            }
        ]
    }
]