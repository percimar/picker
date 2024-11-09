import { z } from 'zod';

export const CreatePickerSchema = z.object({
  things: z.string().min(1).array().nonempty(),
});

export type CreatePickerDto = z.infer<typeof CreatePickerSchema>;
