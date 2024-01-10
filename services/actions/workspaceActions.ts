"use server"

import prisma from "@/lib/prisma_db"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(authentication)/auth/[...nextauth]/route";
import {sendMail} from "@/lib/mailSender";
import path from "path";
import {sendInvitation, userAlreadyInvited} from "@/services/actions/invitationActions";

export const CheckIfManager = async (workspaceID: string, userID: string) => {
    const workspace = await getWorkspace(workspaceID)

    return workspace.participants.some((participant: any) => participant.userId === userID && participant.role === "admin")
}

export const AllManagers = async (workspaceID: string) => {
    const workspace = await getWorkspace(workspaceID)

    let managers: any[] = [];
    await workspace.participants.map((participant: any) => {
        if (participant.role === "admin") {
            return managers.push(participant)
        }
    })

    return managers
}

export const createWorkspace = async (
    name: string,
    description?: string,
    color?: string
) => {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    if (!userID) throw new Error("You are not authenticated")

    return prisma.workspace.create({
        data: {
            name,
            description,
            color,
            participants: {
                create: {
                    userId: userID,
                    role: "admin"
                }
            }
        }
    })
}

export const getWorkspace = async (workspaceID: string) => {
    return prisma.workspace.findFirst({
        where: {
            id: workspaceID
        },
        include: {
            participants: true
        }
    })
}

export const getWorkspaces = async () => {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    if (!userID) return null

    return prisma.workspace.findMany({
        where: {
            participants: {
                some: {
                    userId: userID
                }
            }
        }
    })
}

export const updateWorkspace = async (
    workspaceID: string,
    data: any
) => {

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) throw new Error("You are not authenticated")

    const isManager = await CheckIfManager(workspaceID, userId)
    if (!isManager) throw new Error("You don't have permission to update this workspace")

    return prisma.workspace.update({
        where: {
            id: workspaceID
        },
        data
    })
}

export const deleteWorkspace = async (workspaceID: string) => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) throw new Error("You are not authenticated")

    const isManager = await CheckIfManager(workspaceID, userId)
    if (!isManager) throw new Error("You are not allowed to delete this workspace")

    try {
        await prisma.userWorkspace.deleteMany({
            where: {
                workspaceId: workspaceID
            }
        })

        return prisma.workspace.delete({
            where: {
                id: workspaceID
            }
        })

    } catch (error: any) {
        return error.message
    }
}

export const inviteToWorkspace = async (
    workspaceID: string,
    email: string,
    role: string
) => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) throw new Error("You are not authenticated")

    const isManager = await CheckIfManager(workspaceID, userId)
    if (!isManager) throw new Error("You don't have permission to invite participants to this workspace")


    try {
        const currWorkspace = await getWorkspace(workspaceID)
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const isAlreadyInvited = currWorkspace?.participants.some((participant: any) => participant.userId === user?.id) || await userAlreadyInvited(email)

        if (isAlreadyInvited) {
            return {message: "User already invited", status: 409}
        }

        const invitationUrlData = {
            workspaceId: workspaceID,
            email,
            userId: user?.id,
            role,
            managerId: userId
        }

        const TOKEN_DATA = btoa(JSON.stringify(invitationUrlData));

        const mailOptions = {
            to: email,
            subject: "Invitation to join workspace",
            text: "",
            temp: {
                templateName: "workspace_invitation.hbs",
                data: {
                    logo: {
                        image: "https://i.redd.it/hi-this-is-a-logo-for-the-task-manager-application-called-v0-si3hzlaglc7b1.png?width=8113&format=png&auto=webp&s=750d601f5c083ada2e639535f6b0576fbcb2dc31",
                        content: "TaskOrganizer"
                    },
                    link: `${process.env.NEXT_PUBLIC_API_URL}/workspaces/${workspaceID}/join?token=${TOKEN_DATA}`,
                    inviter: session?.user?.name,
                    workspace: currWorkspace.name
                }
            }
        }

        await sendMail(mailOptions)

        await sendInvitation("workspace", email, TOKEN_DATA)

        return {message: "Invitation sent", status: 201}
    } catch (error: any) {
        console.log("[INVITATION_ERROR]", error.message);
        return {message: error.message, status: 500}
    }
}