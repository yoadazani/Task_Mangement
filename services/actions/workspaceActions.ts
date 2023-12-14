"use server"

import prisma from "@/lib/prisma_db"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(authentication)/auth/[...nextauth]/route";

export const createWorkspace = async (
    name: string,
    description?: string,
    color?: string
) => {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    if (!userID) return null

    return prisma.workspace.create({
        data: {
            name,
            description,
            color
        }
    })
}

export const getWorkspaces = async () => {
    return prisma.workspace.findMany({
        include: {
            users: true
        }
    })
}

export const addParticipantToWorkspace = async (
    workspaceID: string,
    userID: string
) => {
    return prisma.workspace.update({
        where: {
            id: workspaceID
        },
        data: {
            users: {
                connect: {
                    id: userID
                }
            }
        }
    })
}

export const getParticipants = async () => {
    return prisma.workspace.findMany({
        include: {
            users: true
        }
    })
}