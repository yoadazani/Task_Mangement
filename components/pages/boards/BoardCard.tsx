import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {CalendarCheck, FolderEdit, Info} from "lucide-react";
import {ParticipantsGroup} from "@/components/shared/ParticipantsGroup";
import {useBoardParticipants} from "@/stores/board_participants";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {BoardMenu} from "@/components/pages/boards/BoardMenu";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import {useQueryString} from "@/hooks/useQueryString";
import {useBoards} from "@/stores/boards";
import {usePathname, useRouter} from "next/navigation";

export const BoardCard = ({board, isOutOfRect, className}: {
    board: any,
    isOutOfRect?: boolean,
    className?: string
}) => {
    const router = useRouter()
    const boardStore = useBoards()
    const boardParticipantsStore = useBoardParticipants()
    const [newBoardName, setNewBoardName] = useState<string>();
    const {getQueryString, deleteQueryString} = useQueryString();

    const actualBoardRename = getQueryString("rename-board");

    const rename = async (name: string) => {
        if (!name || name.trim() === "") {
            toast("Board name cannot be empty", {
                icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400"/>,
            });
            deleteQueryString("rename-board");
            return;
        }

        await boardStore.updateBoard(board.id, {name});

        deleteQueryString("rename-board");
    }

    const {
        setNodeRef,
        listeners,
        attributes,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: board.id,
        data: {
            type: "board"
        }
    })

    const style = !isOutOfRect ? {
        touchAction: "none",
        transform: CSS.Transform.toString(transform),
        transition
    } : {}

    useEffect(() => {
        (async () => {
            await boardParticipantsStore.fetchParticipants(board.id)
        })()
    }, [boardParticipantsStore.participantsIsLoading]);


    return <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={
            cn(
                "p-2 flex flex-col justify-between space-y-2 hover:drop-shadow-md dark:bg-zinc-800 h-60 max-h-60",
                className,
                isDragging && "opacity-50 border-2 border-dashed border-zinc-400 dark:border-zinc-600"
            )
        }
    >
        <CardHeader className="flex flex-row items-start justify-between p-1">
            <div
                {...listeners}
                className={cn("w-8 h-8 rounded-full cursor-grab", `bg-${board.color}-200 dark:bg-${board.color}-400`)}
            />
            <BoardMenu boardId={board.id}/>
        </CardHeader>

        <CardContent className="px-1 h-full space-y-2">
            {
                (!actualBoardRename || board.id !== actualBoardRename)
                    ? <CardTitle
                        onClick={() => router.push(`boards/${board.id}`)}
                        className="text-2xl font-mono tracking-wide capitalize cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                        {board.name}
                    </CardTitle>
                    : <div
                        className="flex items-center px-2 space-x-2 border rounded-lg border-zinc-400 dark:border-zinc-700">
                        <Input
                            autoFocus
                            placeholder={board.name}
                            onChange={(e) => setNewBoardName(e.target.value)}
                            className="border-0 border-zinc-300 dark:border-zinc-700 rounded-lg outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        />
                        <FolderEdit
                            onClick={() => rename(newBoardName!)}
                            className="h-5 w-5 text-violet-500 dark:text-violet-400 cursor-pointer"
                        />
                    </div>
            }
            <CardDescription>
                {board.description}
            </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-between p-1">
            <div className="flex items-end gap-x-2">
                <CalendarCheck className="h-5 w-5"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold"> Date: </span>
                    {new Date(board.createdAt).toLocaleDateString()}
                </p>
            </div>
            <ParticipantsGroup
                participants={boardParticipantsStore.participants}
                avatarHeight="h-5"
                avatarWidth="w-5"
                maxAvatars={3}
            />
        </CardFooter>
    </Card>
}