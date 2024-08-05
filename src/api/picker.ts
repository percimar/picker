import express from 'express';
import { CreatePickerSchema } from '../dtos/create-picker.dto';
import { PickerService } from '../services/picker.service';

const router = express.Router();

type CreateResponseData = {
  id: number;
  voterLink: string;
  resultsLink: string;
};

router.post('/', async (req, res) => {
  const createPickerDto = CreatePickerSchema.parse(req.body);
  const picker = await PickerService.createPicker(createPickerDto);

  const response: CreateResponseData = {
    id: picker.id,
    voterLink: `${process.env.HOST}/vote?pickerId=${picker.id}`,
    resultsLink: `${process.env.HOST}/results?pickerId=${picker.id}`,
  };
  res.json(response);
});

export default router;
