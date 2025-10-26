import { z } from 'zod';
import { narrativeMongoSchema } from '../mongoSchema';

export const narrativeStoryEntrySchema = narrativeMongoSchema.extend({
  // This is an objectId
  stories: z.array(z.any())
});

export const getNarrativeStoriesResponseSchema = narrativeStoryEntrySchema;

export type NarrativeStoryEntrySchemaType = z.infer<
  typeof narrativeStoryEntrySchema
>;
export type GetNarrativeStoryResponseSchemaType = z.infer<
  typeof getNarrativeStoriesResponseSchema
>;
