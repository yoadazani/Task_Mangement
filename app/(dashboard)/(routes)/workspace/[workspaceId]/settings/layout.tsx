"use client"

import {ReactNode} from 'react';
import {SettingsSidebar} from "@/components/pages/workspace/settings/SettingsSidebar";
import {useWorkspaces} from "@/stores/workspaces";

const SettingsLayout = ({children}: { children: ReactNode }) => {
    const workspaceStore = useWorkspaces()

    if (workspaceStore.isLoading) return <>Loading...</>
    return <div className="p-4">
        <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row w-full h-[calc(100vh-4.8rem)]">
            <SettingsSidebar/>
                <div className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg shadow">
                    {children}
                </div>
        </div>
    </div>
}

export default SettingsLayout;

