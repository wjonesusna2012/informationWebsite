import { z } from 'zod';
export const mongoMarkupSchema = z.object({
  _id: z.any(),
  createdAt: z.date(),
  createdBy: z.string()
});
