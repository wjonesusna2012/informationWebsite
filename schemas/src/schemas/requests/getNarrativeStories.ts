import { z } from 'zod';

export const getNarrativeStoriesQuerySchema = z.object({
  narrativeId: z.string(),
});

export type GetNarrativeStoriesQueryType = z.infer<
  typeof getNarrativeStoriesQuerySchema
>;
