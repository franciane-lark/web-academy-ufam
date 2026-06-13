/*import express, { Request, Response } from 'express';
import env from './utils/validateEnv';

const app = express();

const PORT = env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});


import express, { Request, Response } from 'express';
import env from './utils/validateEnv';
import { loggerMiddleware } from './middlewares/logger';

const app = express();
const PORT = env.PORT;

app.use(loggerMiddleware('simples'));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});

*/

import express from 'express';
import env from './utils/validateEnv';
import { loggerMiddleware } from './middlewares/logger';
import router from './router/router';

const app = express();
const PORT = env.PORT;

app.use(loggerMiddleware('simples'));

app.use(router); 

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
