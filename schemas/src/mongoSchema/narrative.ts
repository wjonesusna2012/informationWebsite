import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addNarrativeSchema } from '../requests';

export const narrativeMongoSchema = addNarrativeSchema.merge(mongoMarkupSchema);

export type NarrativeMongoSchemaType = z.infer<typeof narrativeMongoSchema>;
