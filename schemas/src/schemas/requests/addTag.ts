import { z } from 'zod';

export const addTagSchema = z.object({
    tagName: z.string().min(1).max(30, 'Limit to 30 characters'),
    tagText: z.string().min(1).max(100), 
});

export type AddTagType = z.infer<typeof addTagSchema>;