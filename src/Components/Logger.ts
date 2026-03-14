
/**
 * Simple logger utility used to control console output based on log level.
 */
export default class Logger {
    static LOG_LEVEL: number = 3;

    /**
     * Logs a standard message if the log level is high enough.
     * @param value - The message to log.
     */
    static log(value: string) {
        if (Logger.LOG_LEVEL < 3) return;

        console.log(value);
    }

    /**
     * Logs a debug message if the log level is high enough.
     * @param value - The message to log.
     */
    static debug(value: string) {
        if (Logger.LOG_LEVEL < 5) return;

        console.log(value);
    }
}