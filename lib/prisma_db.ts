// @ts-nocheck
import {PrismaClient} from "@prisma/client";

let prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'production') globalThis.prisma = client;

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to database");
    } catch (error) {
        console.error(error);
        throw new Error("Could not connect to database");
    }
}

export default prisma;