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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sass = __importStar(require("sass-embedded"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const logger_1 = require("./middlewares/logger");
const router_1 = __importDefault(require("./router/router"));
const app = (0, express_1.default)();
const PORT = validateEnv_1.default.PORT;
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        listarNode: function (context) {
            let out = "<ul>";
            context.forEach(tech => {
                if (tech.poweredByNodejs) {
                    out += `<li>${tech.name} - ${tech.type}</li>`;
                }
            });
            out += "</ul>";
            return out;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, 'views'));
try {
    const scssPath = path_1.default.join(__dirname, 'public/css/estilos.scss');
    const cssDir = path_1.default.join(__dirname, 'public/css');
    const cssReleasePath = path_1.default.join(__dirname, 'public/css/estilos.css');
    if (!fs_1.default.existsSync(cssDir)) {
        fs_1.default.mkdirSync(cssDir, { recursive: true });
    }
    if (fs_1.default.existsSync(scssPath)) {
        const result = sass.compile(scssPath);
        fs_1.default.writeFileSync(cssReleasePath, result.css);
        console.log('SASS compilado com sucesso nativamente!');
    }
}
catch (err) {
    console.error('Erro ao compilar SASS:', err);
}
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, logger_1.loggerMiddleware)('simples'));
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
