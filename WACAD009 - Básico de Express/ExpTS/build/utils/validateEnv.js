"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)({ default: 3333 }),
    LOG_DIR: (0, envalid_1.str)({ default: 'logs' }),
});
exports.default = env;
