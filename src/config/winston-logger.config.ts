import * as winston from 'winston';

// 定义自定义日志级别
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'gray',
  },
};
const customeLevelFilter = (levels: string[]) => {
  return winston.format((info, opts) => {
    console.log(info.level);
    return levels.includes(info.level) ? info : false;
  })();
};
winston.addColors(customLevels.colors);

export const winstonLoggerConfig = {
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    // new winston.transports.Console({
    //   consoleWarnLevels: ['http', 'warning', 'error'],
    //   format: winston.format.combine(winston.format.timestamp()),
    // }),
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(customeLevelFilter(['http', 'error']), winston.format.colorize(), winston.format.simple()),
    }),
    // //   保存到数据库
    // new WinstonMongodb.MongoDB({
    //   level: process.env.WINSTON_LOGGER_LEVEL_MONGO || 'verbose',
    //   db: `mongodb://${process.env.MONGO_HOST || '127.0.0.1'}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_WINSTON || 'app-log'}`,
    //   options: { useNewUrlParser: true, useUnifiedTopology: true },
    // }),
    // 输出文件
    new winston.transports.File({
      //定义输出日志文件
      filename: 'logFile/combined.log',
      level: 'http',
    }),
    new winston.transports.File({
      filename: 'logFile/errors.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logFile/warning.log',
      level: 'warning',
    }),
  ],
  // 未捕获的异常
  exceptionHandlers: [new winston.transports.File({ filename: 'logFile/exceptions.log' })],
};
