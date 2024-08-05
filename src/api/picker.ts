import express from 'express';
import { CreatePickerSchema } from '../dtos/create-picker.dto';
import { PickerService } from '../services/picker.service';
import { CreatePickerResponse } from '../types/create-picker.response';
import { PickerSchema } from '../models/picker.model';
import { SubmitVoteSchema } from '../dtos/submit-vote.dto';

const router = express.Router();

router.post('/', async (req, res) => {
  const createPickerDto = CreatePickerSchema.parse(req.body);
  const picker = await PickerService.createPicker(createPickerDto);

  const response: CreatePickerResponse = {
    id: picker.id,
    voterLink: `${process.env.HOST}/vote?pickerId=${picker.id}`,
    resultsLink: `${process.env.HOST}/results?pickerId=${picker.id}`,
  };
  res.json(response);
});

router.get('/:pickerId', async (req, res) => {
  const pickerId = PickerSchema.shape.id.parse(req.route.pickerId);

  const picker = await PickerService.findById(pickerId);

  res.json(picker);
});

router.post('/:pickerId/vote', async (req, res) => {
  const pickerId = PickerSchema.shape.id.parse(req.route.pickerId);
  const submitVoteDto = SubmitVoteSchema.parse(req.body);

  await PickerService.submitVote(pickerId, submitVoteDto);

  res.sendStatus(200);
});

export default router;
