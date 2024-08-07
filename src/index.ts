import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import api from './api';
import * as middlewares from './middlewares';
import path from 'path';

require('dotenv').config();

export const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const host = process.env.HOST_URL || 'http://localhost';
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: ${host}:${port}`);
});
