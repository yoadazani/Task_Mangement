import * as z from "zod";


export const verifyEmailSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email address")
})