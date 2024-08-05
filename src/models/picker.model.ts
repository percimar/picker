import { z } from 'zod';
import { ThingSchema } from './thing.model';

export const PickerSchema = z.object({
  id: z.number(),
  things: ThingSchema.array(),
});

export type Picker = z.infer<typeof PickerSchema>;
