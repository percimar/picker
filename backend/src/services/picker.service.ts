import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreatePickerDto } from '../dtos/create-picker.dto';
import { SubmitVoteDto } from '../dtos/submit-vote.dto';
import { Picker } from '../models/picker.model';
import { prisma } from './prisma.service';

export class PickerService {
  static async findById(pickerId: Picker['id']): Promise<Picker> {
    const picker = await prisma.picker.findFirst({
      where: { id: pickerId },
      include: { things: true },
    });

    if (!picker) throw new Error(`Picker with ID ${pickerId} not found`);

    return picker;
  }

  static async submitVote(pickerId: number, { thingId, vote }: SubmitVoteDto) {
    try {
      await prisma.thing.update({
        where: { id: thingId, pickerId },
        data: { score: { [vote === 'like' ? 'increment' : 'decrement']: 1 } },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new Error(
            `Thing with ID ${thingId} in picker ${pickerId} not found`,
          );
      }
    }
  }

  static async createPicker({ things }: CreatePickerDto): Promise<Picker> {
    const picker = await prisma.picker.create({
      data: {
        things: {
          createMany: {
            data: things.map((name) => ({ name })),
            skipDuplicates: true,
          },
        },
      },
      include: { things: true },
    });

    return picker;
  }
}
