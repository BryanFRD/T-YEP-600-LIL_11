import { createLogger, format, transports } from 'winston';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = createLogger({
    transports: [
        new transports.File({
            dirname: 'logs',
            filename: 'error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            dirname: 'logs',
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(format.timestamp(), format.simple())
    }));
}

export default logger;