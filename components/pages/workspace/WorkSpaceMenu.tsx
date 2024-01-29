import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MoreVertical} from "lucide-react";
import {workspaceMenuLookup} from "@/data/workspaceMenuData";
import {useParams, useRouter} from "next/navigation";
import {useQueryString} from "@/hooks/useQueryString";
import {useWorkspaces} from "@/stores/workspaces";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button";

export const WorkSpaceMenu = ({workspaceId}: { workspaceId: string }) => {
    const router = useRouter();
    const params = useParams();
    const workspaceStore = useWorkspaces()
    const {createQueryString} = useQueryString()

    const workspace_id = workspaceId ?? params.boardId! as string
    const handleTriggerClick = async (triggerLabel: string) => {
        switch (triggerLabel) {
            case "Rename":
                createQueryString(`rename-workspace`, workspace_id)
                break;
            case "Delete":
                try {
                    const response = await workspaceStore.deleteWorkspace(params.workspaceId as string)
                    toast.success(`Workspace " ${response.name} " deleted successfully`)
                    return router.push("/home");
                } catch (error: any) {
                    toast.error(error.message)
                }
                break;
            case "Settings":
                router.push(`/workspace/${params.workspaceId}/settings/information`)
                break;
            default:
                break;
        }
    }

    return <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
            <MoreVertical
                className="h-5 w-5 text-zinc-500 dark:text-zinc-400"
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px] mr-8 md:mr-0">
            {
                Object.entries(workspaceMenuLookup).map(([key, value]) => {
                    return <DropdownMenuItem key={key} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
                            onClick={() => handleTriggerClick(value.label)}
                        >
                            <value.icon className="h-4 w-4"/>
                            <span className="ml-2">{value.label}</span>
                        </Button>
                    </DropdownMenuItem>
                })
            }
        </DropdownMenuContent>
    </DropdownMenu>
}