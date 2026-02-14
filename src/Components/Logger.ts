export default class Logger {
    static LOG_LEVEL: number = 3;

    static log(value: string) {
        if (Logger.LOG_LEVEL < 3) return;

        console.log(value);
    }

    static debug(value: string) {
        if (Logger.LOG_LEVEL < 5) return;

        console.log(value);
    }
}