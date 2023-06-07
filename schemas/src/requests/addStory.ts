import { z } from 'zod';
const MAX_FILE_SIZE = 50000000; //50MB
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
]

export const addStorySchema = z.object({
    storyTitle: z.string().min(1).max(250, 'Limit to 250 characters'),
    date: z.date(),
    summary: z.string().min(1).max(1000, 'Limit to 1000 characters'),
    link: z.string(),
});

export type AddStoryType = z.infer<typeof addStorySchema>;

export default addStorySchema;