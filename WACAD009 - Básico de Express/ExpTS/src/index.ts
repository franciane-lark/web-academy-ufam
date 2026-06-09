import express, { Request, Response } from 'express';
import env from './utils/validateEnv';

const app = express();

const PORT = env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});