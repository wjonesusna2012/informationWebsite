import { z } from 'zod';
import type { ObjectId } from 'bson';

export const addTagToNarrativeResponseSchema = z.object({
  _id: z.any(),
  title: z.string(),
  abbreviation: z.string(),
  summary: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
  tags: z.array(z.string()).optional()
});

export type AddTagToNarrativeResponseType = z.infer<
  typeof addTagToNarrativeResponseSchema
>;

export default addTagToNarrativeResponseSchema;
