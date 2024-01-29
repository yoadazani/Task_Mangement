import React, {useEffect, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {useBoards} from "@/stores/boards";
import {useParams, useRouter} from "next/navigation";
import {useQueryString} from "@/hooks/useQueryString";
import {boardMenuLookup} from "@/data/boardMenuData";
import {Button} from "@/components/ui/button";
import {useWorkspaces} from "@/stores/workspaces";
import {cn} from "@/lib/utils";

export const BoardMenu = ({boardId}: { boardId: string }) => {
    const router = useRouter();
    const params = useParams();
    const workspacesStore = useWorkspaces()
    const boardsStore = useBoards()
    const {createQueryString} = useQueryString()

    const [subMenuOpen, setSubMenuOpen] = useState(false)

    const board_id = boardId ?? params.boardId! as string
    const handleTriggerClick = async (triggerLabel: string) => {
        switch (triggerLabel) {
            case "Rename":
                createQueryString(`rename-board`, board_id)
                break;
            case "Delete":
                await boardsStore.deleteBoard(board_id)
                break;
            case "Settings":
                router.push(`boards/${board_id}/settings`)
                break;
            default:
                break;
        }
    }

    const handleMoveTo = async (boardId: string, destWorkspaceId: string) => {
        if (destWorkspaceId === params.workspaceId) return

        console.log(`move board "${boardId}" from workspace "${params.workspaceId}" to workspace "${destWorkspaceId}"`)

        // TODO - move board to dest workspace

        await boardsStore.moveBoard(boardId, destWorkspaceId)
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <MoreHorizontal className="h-4 w-4"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            {
                Object.entries(boardMenuLookup).map(([key, value]) => {
                    return value.label !== "Move to"
                        ? <DropdownMenuGroup key={key}>
                            <DropdownMenuItem>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
                                    onClick={() => handleTriggerClick(value.label)}
                                >
                                    <value.icon className="mr-2 h-4 w-4"/>
                                    <span>{value.label}</span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        :
                        <DropdownMenuSub key={key} open={subMenuOpen} onOpenChange={setSubMenuOpen}>
                            <DropdownMenuSeparator/>
                            <DropdownMenuSubTrigger
                                onClick={() => setSubMenuOpen(!subMenuOpen)}
                                className="px-5 py-3 h-full w-full text-sm font-medium text-zinc-500 dark:text-zinc-400"
                            >
                                <value.icon className="mr-2 h-4 w-4"/>
                                <span>{value.label}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {
                                        workspacesStore.workspaces.map((workspace) => {
                                            return <DropdownMenuItem key={workspace.id}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="flex justify-start w-full text-sm font-medium text-zinc-500 dark:text-zinc-400"
                                                    onClick={() => handleMoveTo(board_id, workspace.id)}
                                                >
                                                    <div
                                                        className={cn("mr-2 h-5 w-5 rounded-md", `bg-${workspace.color}-200 dark:bg-${workspace.color}-400`)}>
                                                            <span>
                                                                {workspace.name[0].toUpperCase()}
                                                            </span>
                                                    </div>
                                                    <span>{workspace.name}</span>
                                                </Button>
                                            </DropdownMenuItem>
                                        })
                                    }
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                })
            }
        </DropdownMenuContent>
    </DropdownMenu>
}

