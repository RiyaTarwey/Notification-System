import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

const { combine, timestamp, printf } = format;

let logger: any;

if (typeof window === 'undefined') {
    const logDir = path.join(__dirname, '../../../logs');

    // Create the log directory if it does not exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const dailyRotateFileTransport = new DailyRotateFile({
        filename: `${logDir}/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
    });

    logger = createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [
            new transports.Console(),
            dailyRotateFileTransport,
        ],
    });
} else {
    // In the browser, we can just log to the console
    logger = console as any;
}

export default logger;
