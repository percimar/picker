import express from 'express';
import { CreatePickerSchema } from '../dtos/create-picker.dto';
import { PickerIdSchema } from '../dtos/picker-id.dto';
import { SubmitVoteSchema } from '../dtos/submit-vote.dto';
import { PickerService } from '../services/picker.service';
import { CreatePickerResponse } from '../types/create-picker.response';

const router = express.Router();

router.post('/', async (req, res) => {
  const createPickerDto = CreatePickerSchema.parse(req.body);
  const picker = await PickerService.createPicker(createPickerDto);

  const response: CreatePickerResponse = {
    id: picker.id,
    voterLink: `https://asmar.dev/picker/vote.html?pickerId=${picker.id}`,
    resultsLink: `https://asmar.dev/picker/results.html?pickerId=${picker.id}`,
  };
  res.json(response);
});

router.get('/:pickerId', async (req, res) => {
  const { pickerId } = PickerIdSchema.parse(req.params);

  const picker = await PickerService.findById(pickerId);

  res.json(picker);
});

router.post('/:pickerId/vote', async (req, res) => {
  // const pickerId = PickerSchema.shape.id.parse(req.route.pickerId);
  const submitVoteDto = SubmitVoteSchema.parse(req.body);

  await PickerService.submitVote(submitVoteDto);

  res.sendStatus(200);
});

export default router;
