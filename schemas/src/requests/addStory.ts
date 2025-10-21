import { z } from 'zod';
const MAX_FILE_SIZE = 50_000_000; //50MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const addStorySchema = z.object({
  date: z.date(),
  link: z.string(),
  storyTitle: z.string().min(1).max(250, 'Limit to 250 characters'),
  summary: z.string().min(1).max(1000, 'Limit to 1000 characters')
});

export type AddStoryType = z.infer<typeof addStorySchema>;

export default addStorySchema;
