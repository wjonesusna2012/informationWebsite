import { z } from 'zod';
import type { ObjectId } from 'bson';

export const addNarrativeResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  abbreviation: z.string(),
  summary: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
  tags: z.array(z.string()).optional()
});

export type AddNarrativeResponseType = z.infer<
  typeof addNarrativeResponseSchema
>;

export default addNarrativeResponseSchema;
