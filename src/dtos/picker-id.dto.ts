import { z } from 'zod';

export const PickerIdSchema = z.object({
  pickerId: z.string().transform((id) => parseInt(id, 10)),
});

export type PickerIdDto = z.infer<typeof PickerIdSchema>;
