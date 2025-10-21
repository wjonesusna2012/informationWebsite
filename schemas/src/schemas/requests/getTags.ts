import { z } from 'zod';

export const getTagsQuerySchema = z.object({
  searchString: z.string().optional(),
});

export type GetTagsQueryType = z.infer<typeof getTagsQuerySchema>;
