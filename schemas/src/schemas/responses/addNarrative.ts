import { z } from 'zod';
import type { ObjectId } from 'bson';
import { addNarrativeSchema } from '../requests';
import { mongoMarkupSchema } from '../mongoSchema';

export const addNarrativeResponseSchema = addNarrativeSchema.merge(mongoMarkupSchema);

export type AddNarrativeResponseType = z.infer<
  typeof addNarrativeResponseSchema
>;

