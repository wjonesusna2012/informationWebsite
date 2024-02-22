import { z } from 'zod';

export const addTagSchema = z.object({
    tagName: z.string().min(1).max(250, 'Limit to 250 characters'),
    tagText: z.string().min(1).max(100), 
});