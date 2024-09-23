import { z } from 'zod';

export const addStoryToNarrative = z.object({
  narrativeId: z.string(),
  storyId: z.string()
});

export type AddNarrativeToStoryType = z.infer<typeof addStoryToNarrative>;

export default addStoryToNarrative;
