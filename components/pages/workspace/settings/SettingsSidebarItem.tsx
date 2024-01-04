import {ChevronRight, LucideIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

export const SettingsSidebarItem = ({label, value, href, icon: Icon}: { label: string, value: string,  href: string, icon: LucideIcon }) => {
    const url = usePathname()

    return <Link
        href={href}
        className={cn("flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 w-full hover:border-b-2 md:hover:border-b-0 md:hover:border-r-2 hover:border-sky-300 hover:dark:border-sky-400", {
            'bg-zinc-100 dark:bg-zinc-800 border-b-2 md:border-b-0 md:border-r-2 border-sky-300 dark:border-sky-400': url.endsWith(label)
        })}
    >
        <div className="flex flex-row items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5"/>
            </div>
            <span className="text-sm font-medium">{value}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-zinc-500"/>
    </Link>
}