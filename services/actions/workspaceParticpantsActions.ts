"use server"

import prisma from "@/lib/prisma_db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(authentication)/auth/[...nextauth]/route";
import {AllManagers, CheckIfManager, getWorkspace} from "@/services/actions/workspaceActions";

export const fetchParticipants = async (
    workspaceId: string,
    startIndex?: number,
    endIndex?: number
) => {
    try {
        const workspace = await getWorkspace(workspaceId)

        const take = endIndex ?? workspace.participants.length
        const skip = startIndex ?? 0

        return prisma.userWorkspace.findMany({
            take,
            skip,
            where: {
                workspaceId
            }
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const addParticipant = async (
    workspaceID: string,
    userID: string,
    role: string,
    managerId?: string
) => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) throw new Error("You are not authenticated")

    const isManager = await CheckIfManager(workspaceID, userId)
    if (!isManager && !managerId) throw new Error("You don't have permission to add participants to this workspace")

    return prisma.workspace.update({
        where: {
            id: workspaceID
        },
        data: {
            participants: {
                connectOrCreate: {
                    where: {
                        userId_workspaceId: {
                            userId: userID,
                            workspaceId: workspaceID
                        }
                    },
                    create: {
                        userId: userID,
                        role: role,
                    }
                }
            }
        }
    })
}

export const deleteParticipant = async (
    workspaceID: string,
    userID: string
) => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) throw new Error("You are not authenticated")

    const isManager = await CheckIfManager(workspaceID, userId)
    if (!isManager && userID !== userId) throw new Error("You don't have permission to remove participants from this workspace")


    const response = await prisma.userWorkspace.delete({
        where: {
            userId_workspaceId: {
                userId: userID,
                workspaceId: workspaceID
            }
        }
    })

    const currentWorkspace = await getWorkspace(workspaceID)
    if (currentWorkspace.participants.length === 0) {
        await prisma.workspace.delete({
            where: {
                id: workspaceID
            }
        })
    }

    return response
}

export const changeParticipantRole = async (
    workspaceID: string,
    userID: string,
    role: string
) => {
    const session = await getServerSession(authOptions)
    const userId = session.user.id

    if (!userId) throw new Error("You are not authenticated")

    const isManager = await CheckIfManager(workspaceID, userId)
    if (!isManager) throw new Error("You don't have permission to remove participants from this workspace")

    const managers = await AllManagers(workspaceID)
    if (managers.length === 1 && role === "user") throw new Error("There must be at least one manager")

    return prisma.userWorkspace.update({
        where: {
            userId_workspaceId: {
                workspaceId: workspaceID,
                userId: userID
            }
        },
        data: {
            role
        }
    })
}