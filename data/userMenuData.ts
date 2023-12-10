import {LogOut, User, Zap} from "lucide-react";

export const userMenuData = [
    {
        label: 'manage-account',
        value: 'Manage Account',
        link: 'settings/account',
        icon: User
    },
    {
        label: 'upgrade',
        value: 'Upgrade',
        link: 'settings/upgrade',
        icon: Zap
    },
    {
        label: 'logout',
        value: 'Logout',
        link: null,
        icon: LogOut
    }
]