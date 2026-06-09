"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const app = (0, express_1.default)();
const PORT = validateEnv_1.default.PORT;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
