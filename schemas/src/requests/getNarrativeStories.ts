import { z } from 'zod';

export const getNarrativeStoriesQuerySchema = z.object({
    narrativeId: z.string(),
    userId: z.string().optional(),
});

export type GetNarrativeStoriesQueryType = z.infer<typeof getNarrativeStoriesQuerySchema>;