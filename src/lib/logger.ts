import winston from 'winston';
import path from 'path';

const LOGS_PATH = path.join(__dirname, '../../data/logs');

require('dotenv').config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console({ format: winston.format.simple() })],
});

if (!process.env.DISABLE_FILE_LOGGING) {
  logger.add(new winston.transports.File({ filename: path.join(LOGS_PATH, 'error.log'), level: 'error' }));
  logger.add(new winston.transports.File({ filename: path.join(LOGS_PATH, 'combined.log') }));
}

export default logger;
