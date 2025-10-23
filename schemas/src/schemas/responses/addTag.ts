import { z } from 'zod';
import { addTagSchema } from '../requests';
import { mongoMarkupSchema } from '../mongoSchema';

export const addTagResponseSchema = addTagSchema.merge(mongoMarkupSchema);

export type AddTagResponseType = z.infer<typeof addTagResponseSchema>
