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
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const logger_1 = require("./middlewares/logger");
const app = (0, express_1.default)();
const PORT = validateEnv_1.default.PORT;
app.use((0, logger_1.loggerMiddleware)('simples'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
