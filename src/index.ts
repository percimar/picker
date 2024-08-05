import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import api from './api';
import * as middlewares from './middlewares';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const host = process.env.HOST_URL || 'http://localhost';
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: ${host}:${port}`);
});
