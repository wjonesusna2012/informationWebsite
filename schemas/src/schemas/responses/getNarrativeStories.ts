import { z } from 'zod';
import { narrativeMongoSchema, storyMongoSchema } from '../mongoSchema';

export const narrativeStoryEntrySchema = narrativeMongoSchema.extend({
  stories: z.array(storyMongoSchema)
});

export const getNarrativeStoriesResponseSchema = z.array(
  narrativeStoryEntrySchema
);

export type NarrativeStoryEntrySchemaType = z.infer<
  typeof narrativeStoryEntrySchema
>;
export type GetNarrativeStoryResponseSchemaType = z.infer<
  typeof getNarrativeStoriesResponseSchema
>;
