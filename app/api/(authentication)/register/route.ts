import {NextResponse} from "next/server";

import {connectToDatabase} from "@/lib/prisma_db";
import bcrypt from "bcrypt";
import {createUser, findUserByEmail} from "@/services/actions/userActions";


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {name, email, password} = body

        if (!name || !email || !password) {
            return new NextResponse("All fields are required", {status: 400})
        }

        await connectToDatabase()
        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            return new NextResponse("User already exists", {status: 400})
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const userInfo = {
            name,
            email,
            hashedPassword
        }

        await createUser(userInfo)

        return NextResponse.json("User created successfully", {status: 201})
    } catch (error: any) {
        console.log("[REGISTER ERROR]", error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}