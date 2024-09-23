import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addTagSchema } from '../requests';

export const tagMongoSchema = addTagSchema.merge(mongoMarkupSchema); 

export type TagMongoSchemaType = z.infer<typeof tagMongoSchema>;

