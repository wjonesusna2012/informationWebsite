import { z } from 'zod';
import type { ObjectId } from 'bson';
import { addNarrativeSchema } from '../requests';
import { mongoMarkupSchema } from '../common';

export const addNarrativeResponseSchema = addNarrativeSchema.merge(mongoMarkupSchema);

export type AddNarrativeResponseType = z.infer<
  typeof addNarrativeResponseSchema
>;

export default addNarrativeResponseSchema;
