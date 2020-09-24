
enum LogLevel {
  Trace = 'trace',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

export default class Logger {
  // tslint:disable-next-line:variable-name
  public _isDebugMode: boolean = false;

  get isDebugMode(): boolean {
    return this._isDebugMode;
  }

  // @ts-ignore
  set isDebugMode(isDebug: boolean): void {
    this._isDebugMode = isDebug;
  }

  public trace = (message: any): void => {
    this.logWithLevel(LogLevel.Trace, message);
  }

  public debug = (message: any): void => {
    this.logWithLevel(LogLevel.Debug, message);
  }

  public info = (message: any): void => {
    this.logWithLevel(LogLevel.Info, message);
  }

  public warn = (message: any): void => {
    this.logWithLevel(LogLevel.Warn, message);
  }

  public error = (message: any): void => {
    this.logWithLevel(LogLevel.Error, message);
  }

  private logWithLevel = (logLevel: LogLevel, message: any): void => {
    // tslint:disable-next-line
    const logMessage = JSON.parse(JSON.stringify(message));
    if (__DEV__) {
      // @ts-ignore
      // tslint:disable-next-line:tsr-detect-unsafe-properties-access no-commented-out-code
      console[logLevel.toString()](logMessage);
    }
  }
}

const logger = new Logger();
export {logger as Logger};
