import { z } from 'zod';

export const getStorySchema = z.object({
  storyId: z.string().optional(),
});

export type GetStoryQueryType = z.infer<typeof getStorySchema> 
export default getStorySchema;
