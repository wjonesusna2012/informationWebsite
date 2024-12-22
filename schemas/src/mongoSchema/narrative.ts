import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addNarrativeSchema } from '../requests';

export const narrativeMongoSchema = addNarrativeSchema
  .merge(mongoMarkupSchema)
  .merge(z.object({ tags: z.array(z.string()).optional() }));

export type NarrativeMongoSchemaType = z.infer<typeof narrativeMongoSchema>;
