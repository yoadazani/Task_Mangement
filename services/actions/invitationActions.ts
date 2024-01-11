"use server";

import prisma from "@/lib/prisma_db";
import {addParticipant} from "@/services/actions/workspaceParticpantsActions";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(authentication)/auth/[...nextauth]/route";


export const getInvitations = async () => {
    try {
        return await prisma.userInvitations.findMany()

    } catch (error) {
        console.log("[GET_INVITATIONS_ERROR]", error);
        return []
    }
}

export const sendInvitation = async (
    type: string,
    email: string,
    token: string
) => {
    try {
        await prisma.userInvitations.create({
            data: {
                type,
                email,
                token,
                status: "pending"
            }
        })

        return true

    } catch (error) {
        console.log("[INVITATION_ERROR]", error);
        return false
    }
}

export const acceptInvitation = async (
    email: string,
    token: string
) => {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    if (!userID) throw new Error("You are not authenticated")
    try {
        if (!token) {
            return new Error("No token provided")
        }

        const decoded_token_data = atob(token);

        const retrieved_token_data = JSON.parse(decoded_token_data);

        await prisma.userInvitations.update({
            where: {
                email
            },
            data: {
                status: "accepted"
            }
        })

        return retrieved_token_data
    } catch (error: any) {
        console.log("[ACCEPT_INVITATION_ERROR]", error);
        throw new Error(error.message)
    }
}

export const userAlreadyInvited = async (
    email: string
) => {
    try {
        return await prisma.userInvitations.findFirst({
            where: {
                email,
                status: {
                    not: "accepted"
                }
            }
        })

    } catch (error: any) {
        console.log("[USER_ALREADY_INVITED_ERROR]", error);
        return new Error(error.message)
    }
}