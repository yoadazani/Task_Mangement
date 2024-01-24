"use server"

import prisma from "@/lib/prisma_db";
import {isAuthenticated} from "@/services/actions/userActions";
import {Prisma} from "@prisma/client";

export const isBoardManager = async (boardID: string, userID: string) => {
    const board = await fetchSingleBoard(boardID)

    return board.participants.some((participant: any) => participant.userId === userID && participant.role === "admin")
}

export const fetchBoards = async (workspaceId: string) => {
    const userId = await isAuthenticated()

    try {
        return await prisma.board.findMany({
            where: {
                workspaceId,
                participants: {
                    some: {
                        userId
                    }
                }
            },
            orderBy: {
                position: "asc"
            }
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const swapBoards = async (sourceId: string, sourceIndex: number, destinationIndex: number) => {
    const userId = await isAuthenticated()

    if (!userId) throw new Error("You are not authenticated")

    try {
        return await prisma.$transaction(async () => {
            let updateCondition: Prisma.BoardWhereInput;
            let updatedBoardData: Prisma.BoardUpdateInput;

            if (sourceIndex < destinationIndex) {
                updateCondition = {
                    position: {
                        gt: sourceIndex,
                        lte: destinationIndex
                    }
                }
                updatedBoardData = {
                    position: {
                        decrement: 1
                    }
                }
            } else {
                updateCondition = {
                    position: {
                        gte: destinationIndex,
                        lt: sourceIndex
                    }
                }
                updatedBoardData = {
                    position: {
                        increment: 1
                    }
                }
            }


            return [
                prisma.board.updateMany({
                    where: updateCondition,
                    data: updatedBoardData
                }),
                prisma.board.update({
                    where: {
                        id: sourceId
                    },
                    data: {
                        position: destinationIndex
                    }
                }),
            ]

        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const fetchSingleBoard = async (boardId: string) => {
    try {
        return await prisma.board.findFirst({
            where: {
                id: boardId
            }
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const createBoard = async (
    workspaceId: string,
    name: string,
    description?: string,
    color?: string,
) => {
    const userId = await isAuthenticated()

    try {
        const boards = await fetchBoards(workspaceId)
        const boardsLength = boards.length ?? 0

        return prisma.board.create({
            data: {
                name,
                description,
                color,
                workspaceId,
                position: boardsLength + 1,
                participants: {
                    create: {
                        userId,
                        role: "admin"
                    }
                }
            }
        })

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateBoard = async (
    boardID: string,
    data: any
) => {
    const userId = await isAuthenticated()

    const isManager = await isBoardManager(boardID, userId)
    if (!isManager) throw new Error("You don't have permission to update this board")

    try {

        return prisma.board.update({
            where: {
                id: boardID
            },
            data
        })

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteBoard = async (boardID: string) => {
    const userId = await isAuthenticated()

    const isManager = await isBoardManager(boardID, userId)
    if (!isManager) throw new Error("You don't have permission to update this board")

    try {
        return prisma.board.delete({
            where: {
                id: boardID
            }
        })

    } catch (error: any) {
        throw new Error(error.message)
    }
}