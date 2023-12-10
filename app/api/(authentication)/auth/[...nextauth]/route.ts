import NextAuth, {SessionStrategy} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma, {connectToDatabase} from "@/lib/prisma_db";
import {findUserByEmail} from "@/services/actions/userActions";


import bcrypt from "bcrypt";
import {JwtPayload} from "jsonwebtoken";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        Credentials({
            id: "credentials",
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const {email, password} = credentials as { email: string, password: string }

                if (!email || !password) {
                    throw new Error("Email and password required!")
                }

                await connectToDatabase()
                const user = await findUserByEmail(email)
                if (!user) {
                    throw new Error('User not found')
                }

                const verifyPassword = bcrypt.compareSync(password, user.hashedPassword)
                if (!verifyPassword) {
                    throw new Error('Incorrect password')
                }


                return user
            }
        })
    ],
    callbacks: {
        async jwt({token, trigger, session, user}: JwtPayload) {
            console.log({
                token,
                trigger,
                session,
                user
            })
            if (trigger === "update" && session) {
                token = {
                    ...token,
                    ...session
                }
            }
            if (user) {
                return {
                    ...token,
                    uid: user.id
                }
            }

            return token
        },
        async session({session, token}: JwtPayload) {
            if (token) session.user.id = token.uid

            console.log({
                session,
                token
            })
            session = {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    email: token.email,
                    image: token.picture
                }
            }

            return session
        }
    },
    session: {
        strategy: 'jwt' as SessionStrategy,
        maxAge: 60 * 60 * 24 // 24 hours
    },
    pages: {signIn: '/login'},
    secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}