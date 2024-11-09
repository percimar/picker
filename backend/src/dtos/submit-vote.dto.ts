import { z } from 'zod';
import { ThingSchema } from '../models/thing.model';

export const SubmitVoteSchema = z.object({
  thingId: ThingSchema.shape.id,
  vote: z.enum(['like', 'dislike']),
});

export type SubmitVoteDto = z.infer<typeof SubmitVoteSchema>;
