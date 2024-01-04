"use client"

import {Settings, Users} from "lucide-react";
import {useParams, usePathname} from "next/navigation";
import {useEffect} from "react";
import {cn} from "@/lib/utils";
import {useWorkspaces} from "@/stores/workspaces";
import {SettingsSidebarItem} from "@/components/pages/workspace/settings/SettingsSidebarItem";



export const SettingsSidebar = () => {
    const params = useParams()
    const workspaceStore = useWorkspaces()

    useEffect(() => {
        (async () => {
            await workspaceStore.fetchSingleWorkspace(params.workspaceId as string)
        })()
    }, []);

    return <div
        className="flex flex-col space-y-4 md:space-y-0 md:w-[30%] border border-zinc-200 dark:border-zinc-700 rounded-lg shadow">
        <div className="flex items-center gap-x-4 p-4">
            <div className={cn("w-8 h-8 rounded-lg text-center py-1", `bg-${workspaceStore.workspace?.color}-200`)}>
                <span className="font-bold">{workspaceStore.workspace?.name?.[0].toUpperCase()}</span>
            </div>
            <p>{workspaceStore.workspace?.name}</p>
        </div>

        <div className="flex flex-row items-center justify-center md:items-stretch md:flex-col">

            <SettingsSidebarItem
                label="information"
                value="Information"
                href={`/workspace/${params.workspaceId}/settings/information`}
                icon={Settings}
            />

            <SettingsSidebarItem
                label="members"
                value="Members"
                href={`/workspace/${params.workspaceId}/settings/members`}
                icon={Users}
            />

        </div>
    </div>
}