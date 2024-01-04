import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MoreVertical} from "lucide-react";
import {workspaceMenuLookup} from "@/data/workspaceMenuData";

export const WorkSpaceMenu = () => {
    return <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
            <MoreVertical
                className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px] mr-8 md:mr-0">
            {
                Object.entries(workspaceMenuLookup).map(([key, value]) => {
                    const TriggerOption = value.component
                    return <DropdownMenuItem key={key} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                        <TriggerOption className="text-sm font-medium text-zinc-500 dark:text-zinc-400"/>
                    </DropdownMenuItem>
                })
            }
        </DropdownMenuContent>
    </DropdownMenu>
}