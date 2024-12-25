import { z } from 'zod';

export const getStorySchema = z.object({
  _id: z.string().optional(),
  storyTitle: z.string().optional(),
  date: z.date().optional(),
  link: z.string().optional(),
  summary: z.string().optional(),
  createdAt: z.date().optional(),
  createdBy: z.string().optional(),
});

export default getStorySchema;
