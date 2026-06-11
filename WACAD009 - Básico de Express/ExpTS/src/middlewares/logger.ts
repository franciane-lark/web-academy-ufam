import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import env from '../utils/validateEnv';

export type LogFormat = 'simples' | 'completo';

export const loggerMiddleware = (format: LogFormat) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    let logLine = '';

    if (format === 'simples') {
      logLine = `${timestamp}, ${req.url}, ${req.method}\n`;
    } else if (format === 'completo') {
      const httpVersion = req.httpVersion;
      const userAgent = req.get('User-Agent') || 'Unknown-Agent';
      logLine = `${timestamp}, ${req.url}, ${req.method}, HTTP/${httpVersion}, ${userAgent}\n`;
    }

    const logDirPath = path.resolve(env.LOG_DIR);
    const logFilePath = path.join(logDirPath, 'access.log');

    try {
      if (!fs.existsSync(logDirPath)) {
        fs.mkdirSync(logDirPath, { recursive: true });
      }

      fs.appendFile(logFilePath, logLine, (err) => {
        if (err) console.error('Erro ao salvar o log no arquivo:', err);
      });
    } catch (error) {
      console.error('Erro ao manipular diretório de logs:', error);
    }

    next();
  };
};