"use server";

import prisma from "@/lib/prisma_db"
import {IUser} from "@/interfaces/shared/IUser";
import bcrypt from "bcrypt";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/(authentication)/auth/[...nextauth]/route";


export const isAuthenticated = async () => {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    if (!userID) throw new Error("You are not authenticated")

    return userID
}
export const createUser = async (data: IUser) => {
    return prisma.user.create({
        data
    });
}
export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
            hashedPassword: {
                not: null
            }
        }
    });
}

export const findUserById = async (userId: string) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    });
}

export const updateUser = async (userId: string, data: IUser) => {
    if (!data.id) delete data.id

    return prisma.user.update({
        where: {
            id: userId
        },
        data
    });
}

export const updatePassword = async (userId: string, password: string) => {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            hashedPassword: bcrypt.hashSync(password, 10)
        }
    });
}

export const deleteUser = async (userId: string) => {
    return prisma.user.delete({
        where: {
            userId
        }
    });
}