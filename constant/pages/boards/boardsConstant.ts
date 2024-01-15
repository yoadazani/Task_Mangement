import * as z from "zod";

export const boardsSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    description: z.string()
        .min(1, {message: "Description is required"})
        .max(200, {message: "Description must be at most 200 characters long"})
        .optional().or(z.literal('')),
    color: z.string()
        .min(1, {message: "Color is required"})
        .optional().or(z.literal('')),
}).refine(data => Object.values(data).some(v => v !== ''), {
    message: "At least one field must be provided"
});