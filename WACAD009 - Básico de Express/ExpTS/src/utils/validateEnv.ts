import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 3333 }),
  LOG_DIR: str({ default: 'logs' }),
});

export default env;