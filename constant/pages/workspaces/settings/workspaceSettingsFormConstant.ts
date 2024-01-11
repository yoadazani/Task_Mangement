import * as z from "zod";


export const workspaceSettingsFormSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters long")
        .optional().or(z.literal('')),
    description: z.string()
        .min(10, "Description must be at least 10 characters long")
        .max(200, "Description must be at most 200 characters long")
        .optional().or(z.literal('')),
    color: z.string().optional().or(z.literal(''))
}).refine(data => Object.values(data).some(v => v !== ''), {
    message: "At least one field must be provided"
});