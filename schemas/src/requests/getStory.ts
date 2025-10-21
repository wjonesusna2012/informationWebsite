import { z } from 'zod';

export const getStorySchema = z.object({
  _id: z.string().optional(),
});

export default getStorySchema;
