import { z } from 'zod';

export const addNarrativeSchema = z.object({
    title: z.string().min(1).max(250, 'Keep title less than 250 characters'),
    abbreviation: z.string().min(1, 'Cannot be empty').max(12, 'Abbreviation limited to 12 characters'),
    summary: z.string().min(1).max(5000, 'Keep summary to less than 5000 characters'),
});

export type AddNarrativeType = z.infer<typeof addNarrativeSchema>

export default addNarrativeSchema;