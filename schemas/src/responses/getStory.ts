import { z } from 'zod';

import StoryResponseSchema from '../mongoSchema/story';

export const getStoryResponseSchema = StoryResponseSchema;

export type GetStoryResponseSchemaType = z.infer<typeof getStoryResponseSchema>;

export default getStoryResponseSchema;
