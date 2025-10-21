import { z } from 'zod';
import { addTagSchema } from '../requests';
import { mongoMarkupSchema } from '../common';

export const addTagResponseSchema = addTagSchema.merge(mongoMarkupSchema);

export type AddTagResponseType = z.infer<typeof addTagResponseSchema>

export default addTagResponseSchema;