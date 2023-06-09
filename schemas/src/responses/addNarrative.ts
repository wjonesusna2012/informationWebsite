import { z } from 'zod';
import type { ObjectId } from 'bson';

export const addNarrativeResponseSchema = z.object({
    _id: z.any(),
    title: z.string(),
    abbreviation: z.string(),
    summary: z.string(),
    createdAt: z.date(),
    createdBy: z.string(),
});

export type AddNarrativeResponseType = z.infer<typeof addNarrativeResponseSchema>

export default addNarrativeResponseSchema;