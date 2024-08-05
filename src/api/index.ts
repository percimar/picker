import express from 'express';
import votes from './votes';

const router = express.Router();

router.use('/votes', votes);

export default router;
