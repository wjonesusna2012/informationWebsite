import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addStorySchema } from '../requests';

export const storyMongoSchema = addStorySchema
  .merge(mongoMarkupSchema)
  .merge(z.object({ tags: z.array(z.string()).optional() }));

export type StoryMongoSchemaType = z.infer<typeof storyMongoSchema>;
