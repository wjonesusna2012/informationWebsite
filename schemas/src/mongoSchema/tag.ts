import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addTagSchema } from '../requests';

export const tagMongoSchema = addTagSchema
  .merge(mongoMarkupSchema)
  .merge(z.object({ tags: z.array(z.string()).optional() }));

export type TagMongoSchemaType = z.infer<typeof tagMongoSchema>;
