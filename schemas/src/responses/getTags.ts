import { z } from 'zod';
import addTagResponseSchema from './addTag';

export const getTagsResponseSchema = z.array(addTagResponseSchema);

export type GetTagsResponseType = z.infer<typeof getTagsResponseSchema>;

export default getTagsResponseSchema;
