import { CreatePickerDto } from '../dtos/create-picker.dto';
import { SubmitVoteDto } from '../dtos/submit-vote.dto';
import { Picker } from '../models/picker.model';

export class PickerService {
  static async findById(pickerId: Picker['id']): Promise<Picker> {
    return {
      id: pickerId,
      things: [
        { id: 0, name: 'Thing 1', score: 0 },
        { id: 0, name: 'Thing 2', score: 0 },
      ],
    };
  }

  static async submitVote(pickerId: number, submitVoteDto: SubmitVoteDto) {
    throw new Error('Method not implemented.');
  }

  static async createPicker({ things }: CreatePickerDto): Promise<Picker> {
    return {
      id: 1,
      things: things.map((name, index) => ({ id: index, name, score: 0 })),
    };
  }
}
