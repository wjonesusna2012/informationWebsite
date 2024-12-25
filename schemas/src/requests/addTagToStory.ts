import { z } from 'zod';

export const addTagToStorySchema = z.object({
  storyId: z.string(),
  tags: z.array(z.string()),
});

export type AddTagToStoryType = z.infer<typeof addTagToStorySchema>;

export default addTagToStorySchema;
