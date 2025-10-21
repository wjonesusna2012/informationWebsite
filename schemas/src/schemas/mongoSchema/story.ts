import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addStoryResponseSchema } from '../responses';

export const storyMongoSchema = addStoryResponseSchema
  .merge(z.object({ tags: z.array(z.string()).optional() }));

export type StoryMongoSchemaType = z.infer<typeof storyMongoSchema>;

export default storyMongoSchema;
