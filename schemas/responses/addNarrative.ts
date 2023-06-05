import { z } from 'zod';

export const addNarrativeResponseSchema = z.object({
    _id: z.string(),
    title: z.string(),
    abbreviation: z.string(),
    summary: z.string(),
    createdAt: z.date(),
    createdBy: z.string(),
});

export default addNarrativeResponseSchema;