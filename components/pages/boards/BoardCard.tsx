import React, {useEffect} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {CalendarCheck, MoreHorizontal} from "lucide-react";
import {ParticipantsGroup} from "@/components/shared/ParticipantsGroup";
import {useBoardParticipants} from "@/stores/board_participants";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export const BoardCard = ({board, isOutOfRect, className}: { board: any, isOutOfRect?: boolean, className?: string }) => {
    const boardParticipantsStore = useBoardParticipants()

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
    }: {}

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
                "p-2 flex flex-col justify-between space-y-2 hover:drop-shadow-md dark:bg-zinc-800",
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
            <MoreHorizontal className="h-5 w-5 z-50 cursor-pointer"/>
        </CardHeader>

        <CardContent className="px-1 h-full">
            <CardTitle
                className="text-2xl font-mono tracking-wide capitalize cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300">
                {board.name}
            </CardTitle>
            <CardDescription>
                {board.description}
            </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-between p-1">
            <div className="flex items-center gap-x-2">
                <CalendarCheck className="h-5 w-5"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
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