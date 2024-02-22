import { z } from 'zod';
import type { ObjectId } from 'bson';

export const addTagResponseSchema = z.object({
    _id: z.any(),
    tagName: z.string(),
    tagTitle: z.string(),
    createdAt: z.date(),
    createdBy: z.string(),
});

export type AddTagResponseType = z.infer<typeof addTagResponseSchema>

export default addTagResponseSchema;