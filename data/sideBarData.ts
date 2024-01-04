import {Activity, LayoutDashboard, Receipt, Settings, User, Zap} from "lucide-react";
import {ISideBarLink} from "@/interfaces/layout/ISideBarLink";

export const sideBarData: ISideBarLink[] = [
    {
        label: "home",
        value: "Dashboard",
        path: "/home",
        icon: LayoutDashboard,
        subLinks: null
    },
    {
        label: "activity",
        value: "Activity",
        path: "/activity",
        icon: Activity,
        subLinks: null
    },
    {
        label: "setting",
        value: "Setting",
        path: null,
        icon: Settings,
        subLinks: [
            {
                label: "account",
                value: "Account",
                path: "/setting/account",
                icon: User,
                subLinks: null
            },
            {
                label: "plans",
                value: "plans",
                path: "/setting/plans",
                icon: Zap,
                subLinks: null
            },
            {
                label: "billing",
                value: "Billing",
                path: "setting/billing",
                icon: Receipt,
                subLinks: null
            }
        ]
    }
]