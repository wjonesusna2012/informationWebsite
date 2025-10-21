import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import { addTagResponseSchema } from '../responses/addTag';

export const tagMongoSchema = addTagResponseSchema;
export type TagMongoSchemaType = z.infer<typeof tagMongoSchema>;
