import { z } from 'zod';

export const addStoryResponseSchema = z.object({
  _id: z.string(),
  storyTitle: z.string(),
  date: z.date(),
  link: z.string(),
  summary: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
});

export default addStoryResponseSchema;