import z from "zod";

export const createQuestionSchema = z.object({
    title: z.string(),
    body: z.string(),
    tags: z.array(z.string()),
    userId: z.string(),
    imageUrl: z.string().optional(),
    isSolved: z.boolean().optional(),
    anonymous: z.boolean().optional()
})



