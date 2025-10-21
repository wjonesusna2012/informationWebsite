import { z } from 'zod';
import { mongoMarkupSchema } from '../common';
import AddTagResponseSchema from '../responses/addTag';

export const tagMongoSchema = AddTagResponseSchema;
export type TagMongoSchemaType = z.infer<typeof tagMongoSchema>;
