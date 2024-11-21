import fs from "fs";
import path from "path";
// import { fileURLToPath } from "url";
import { Request, Response, Next } from "@/types/request";
import { appConfig } from "@/config";

const date: string = new Date().toISOString();
// const date: string = new Date().toISOString();
// const date: string = new Date().toUTCString();
// const date: string = new Date().toLocaleString('tr-TR');
// const date: string = new Date().toString();

// Creates a console log
export const createConsoleLog = (req: Request, res: Response, next: Next): void => {
    console.log(`${new Date().toUTCString()} - ${req.method} ${req.url}`);
    next();
};
// Creates a log message
export const createLogMessage = (err: Error, req: Request, res: Response): string => {
    return `${date} - ${req.method} ${req.url} (message: ${err.message})\nstack: ${err.stack}\n\n`;
};
// Creates a log file
const createLogFile = (): string => {
    // const __filename = fileURLToPath(import.meta.url); // Get the parsed file path
    const __dirname = path.dirname(__filename); // Get the name of the directory
    const logDirectory = path.join(__dirname, '../logs');
    const logFileName = `${date.slice(0, 10)}.log`;

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    return path.join(logDirectory, logFileName);
};
// Adds a new log to the log file
const appendLogFile = (err: Error, req: Request, res: Response): void => {
    const logFile = createLogFile();
    const errorLogMessage = createLogMessage(err, req, res);

    try {
        fs.appendFileSync(logFile, errorLogMessage);
    } catch (fileErr) {
        console.error('Failed to write to log file', fileErr);
    }
};
// Creates a new log record
export const createNewLog = async (err: Error, req: Request, res: Response, next?: Next): Promise<void> => {
    // TODO: Integration with error tracking systems is possible. (e.g. sentry.io, rollbar.com)
    if (appConfig.loggingFile) {
        appendLogFile(err, req, res);
    } else {
        createLogMessage(err, req, res);
    }
};
