import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addNarrativeResponseSchema } from '../responses';

export const narrativeMongoSchema = addNarrativeResponseSchema
  .merge(z.object({ tags: z.array(z.string()).optional() }));

export type NarrativeMongoSchemaType = z.infer<typeof narrativeMongoSchema>;
