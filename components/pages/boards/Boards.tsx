"use client"

import React, {useEffect} from 'react';
import {useBoards} from "@/stores/boards";
import {useParams} from "next/navigation";
import {BoardCard} from "@/components/pages/boards/BoardCard";

export const Boards = () => {
    const params = useParams()
    const boardStore = useBoards()

    useEffect(() => {
        (async () => {
            await boardStore.fetchBoards(params.workspaceId as string)
        })()
    }, [boardStore.boards])

    return (
        boardStore.boards.map((board: any) => {
            return <BoardCard key={board.id} board={board}/>
        })
    )
}