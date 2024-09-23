import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addStorySchema } from '../requests';

export const storyMongoSchema = addStorySchema.merge(mongoMarkupSchema); 

export type StoryMongoSchemaType = z.infer<typeof storyMongoSchema>;

