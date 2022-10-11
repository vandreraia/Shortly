import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/index.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(json());

app.use(router);

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => console.log("Servidor aberto na porta.: ", process.env.PORT));