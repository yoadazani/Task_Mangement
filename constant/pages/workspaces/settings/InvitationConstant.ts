import * as z from "zod"

export const InvitationSchema = z.object({
    email: z.string({required_error: "email is required"})
        .email({message: "Invalid email address"}),
    role: z.string({required_error: "role is required"}),
})