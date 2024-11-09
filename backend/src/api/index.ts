import express from 'express';
import picker from './picker';

const router = express.Router();

router.use('/picker', picker);

export default router;
