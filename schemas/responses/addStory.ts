import { z } from 'zod';

const addNarrativeResponseSchema = z.object({
    _id: z.string(),
    storyTitle: z.string(),
    summary: z.string(),
    createdAt: z.date(),
    createdBy: z.string(),
});

export default addNarrativeResponseSchema;