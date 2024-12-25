import { z } from 'zod';

export const getTagsResponseSchema = z.array(
  z.object({
    _id: z.string(),
    tagName: z.string(),
    tagTitle: z.string(),
    createdAt: z.date(),
    createdBy: z.string()
  })
);

export type GetTagsResponseType = z.infer<typeof getTagsResponseSchema>;

export default getTagsResponseSchema;
