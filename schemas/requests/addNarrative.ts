import { z } from 'zod';

const addNarrativeSchema = z.object({
    title: z.string().max(250, 'Keep title less than 250 characters'),
    abbreviation: z.string().min(1).max(12),
    summary: z.string().max(5000, 'Keep summary to less than 5000 characters'),
});

export default addNarrativeSchema;