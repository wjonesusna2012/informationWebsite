import { z } from 'zod';
const MAX_FILE_SIZE = 50000000; //50MB
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
]

export const addStorySchema = z.object({
    storyTitle: z.string(),
    date: z.date(),
    summary: z.string(),
    files: z
        .any()
        .refine((files) => files?.length >= 0, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
        .refine(files => files?.every((file: { size?: number; }) => !!file?.size && file?.size <= MAX_FILE_SIZE), `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
        .refine(
            files => files.every((file: { type?: string; }) => ACCEPTED_IMAGE_TYPES.includes(file?.type ?? '')),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
});

export type AddStoryType = z.infer<typeof addStorySchema>;

export default addStorySchema;