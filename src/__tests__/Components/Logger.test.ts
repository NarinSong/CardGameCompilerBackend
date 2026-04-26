import Logger from '../../Components/Logger';

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  const originalLogLevel = Logger.LOG_LEVEL;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    Logger.LOG_LEVEL = originalLogLevel;
  });

  describe('log', () => {
    it('should log messages to console when LOG_LEVEL >= 3', () => {
      Logger.LOG_LEVEL = 3; // Enable logs
      Logger.log('test message');
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should not log when LOG_LEVEL < 3', () => {
      Logger.LOG_LEVEL = 2;
      Logger.log('test message');
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log with single string argument', () => {
      Logger.LOG_LEVEL = 3;
      Logger.log('message');
      expect(consoleLogSpy).toHaveBeenCalledWith('message');
    });
  });

  describe('debug', () => {
    it('should log debug messages when LOG_LEVEL >= 5', () => {
      Logger.LOG_LEVEL = 5; // Debug level
      Logger.debug('debug message');
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should not log debug when LOG_LEVEL < 5', () => {
      Logger.LOG_LEVEL = 3;
      Logger.debug('debug message');
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
