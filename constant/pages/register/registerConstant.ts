import * as z from "zod"

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Email is invalid" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" }),
})