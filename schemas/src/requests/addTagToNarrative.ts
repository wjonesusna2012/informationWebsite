import { z } from 'zod';

export const addTagToNarrativeSchema = z.object({
  narrativeId: z.string(),
  tags: z.array(z.string()),
});

export type AddTagToNarrativeType = z.infer<typeof addTagToNarrativeSchema>;

export default addTagToNarrativeSchema;
