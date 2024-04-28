import express, { Request, Response } from 'express';
import { getCoordinates } from './database';

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {

  try {
    const coordinates = await getCoordinates();
    res.status(200).json({coordinates:coordinates});
  } catch (error) {
    res.status(400).json({error});
  }

});

app.listen(3000, () => console.log('Server is running on port 3000'));