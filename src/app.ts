import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;

app.get('/', (request: Request, response: Response): void => {
  response.send('<a href="/users">Go to all users</a>');
});

app.use(express.json());

app.use('/users', usersRouter);

app.listen(PORT, (): void => console.log(`Server is running on http://localhost:${PORT}`));
