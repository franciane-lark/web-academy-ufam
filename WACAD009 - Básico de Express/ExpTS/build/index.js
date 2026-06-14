"use strict";
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
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const logger_1 = require("./middlewares/logger");
const router_1 = __importDefault(require("./router/router"));
const app = (0, express_1.default)();
const PORT = validateEnv_1.default.PORT;
// Configuração do Handlebars
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, logger_1.loggerMiddleware)('simples'));
// Carrega as rotas
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
