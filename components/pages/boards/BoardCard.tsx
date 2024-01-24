import React, {useEffect} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {CalendarCheck, MoreHorizontal} from "lucide-react";
import {ParticipantsGroup} from "@/components/shared/ParticipantsGroup";
import {useBoardParticipants} from "@/stores/board_participants";

export const BoardCard = ({board, className}: { board: any, className?: string}) => {
    const boardParticipantsStore = useBoardParticipants()

    useEffect(() => {
        (async () => {
            await boardParticipantsStore.fetchParticipants(board.id)
        })()
    }, [boardParticipantsStore.participantsIsLoading]);


    return <Card
        className={cn("p-2 flex flex-col justify-between space-y-2 hover:drop-shadow-md dark:bg-zinc-800 cursor-grab", className)}>
        <CardHeader className="flex flex-row items-start justify-between p-1">
            <div
                className={cn("w-8 h-8 rounded-full", `bg-${board.color}-200 dark:bg-${board.color}-400`)}/>
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