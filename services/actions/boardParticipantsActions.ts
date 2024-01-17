"use server"

import prisma from "@/lib/prisma_db";
import {fetchSingleBoard} from "@/services/actions/boardActions";

export const fetchParticipants = async (
    boardId: string,
    startIndex?: number,
    endIndex?: number
) => {
    try {
        const actualBoard = await fetchSingleBoard(boardId)

        const take = endIndex ?? actualBoard.participants?.length
        const skip = startIndex ?? 0

        return prisma.userBoard.findMany({
            take,
            skip,
            where: {
                boardId
            }
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const addParticipant = async (boardId: string, userId: string, role: string) => {
}

export const deleteParticipant = async (boardId: string, userId: string) => {
}

export const changeParticipantRole = async (boardId: string, userId: string, role: string) => {
}