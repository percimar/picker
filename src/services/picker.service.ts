import { CreatePickerDto } from '../dtos/create-picker.dto';
import { Picker } from '../models/picker.model';

export class PickerService {
  static async createPicker({ things }: CreatePickerDto): Promise<Picker> {
    return {
      id: 1,
      things: things.map((name, index) => ({ id: index, name, score: 0 })),
    };
  }
}
