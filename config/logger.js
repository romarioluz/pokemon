import winston from 'winston';
import winstondb from 'winston-mongodb';

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports, format } = winston;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
   // new transports.Console(),
    new transports.MongoDB({
      level: 'info',
      db: process.env.MONGODB,
      collection: 'pokemon-logs',
      capped: true,   //coleção circular
      cappedMax: 20,  //máx 20 documentos
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: format.combine(
    label({ label: 'pokemon-api' }),
    format.timestamp(),
    myFormat
  ),
});

export { logger };
