import { z } from 'zod';

export const ThingSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  score: z.number().default(0),
});

export type Thing = z.infer<typeof ThingSchema>;
