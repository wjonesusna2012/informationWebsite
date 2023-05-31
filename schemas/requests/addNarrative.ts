import { z } from 'zod';

const addNarrativeSchema = z.object({
    title: z.string(),
    summary: z.string(),
});

export default addNarrativeSchema;