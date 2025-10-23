import { z } from 'zod';
import { addStorySchema } from '../requests';
import { mongoMarkupSchema } from '../mongoSchema';

export const addStoryResponseSchema = addStorySchema.merge(mongoMarkupSchema);

export type AddStoryResponseType = z.infer<typeof addStoryResponseSchema>
