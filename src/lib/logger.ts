import winston from 'winston';
import path from 'path';

const LOGS_PATH = path.join(__dirname, '../../data/logs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: path.join(LOGS_PATH, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(LOGS_PATH, 'combined.log') }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
