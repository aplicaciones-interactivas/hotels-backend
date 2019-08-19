const winston = require('winston');
const loggingConfig = require('config').logging;
const {splat, combine, timestamp, printf} = winston.format;

class LoggerFactory {
    static create(label) {

        const myFormat = printf(({timestamp, level, message, meta}) => {
            return `${timestamp} ${level.toUpperCase()} --- [${label}]: ${message}`;
        });


        let winstonTransport = [];
        if (loggingConfig.console) {
            winstonTransport.push(new winston.transports.Console(loggingConfig.console));
        }
        if (loggingConfig.file) {
            winstonTransport.push(new winston.transports.File(loggingConfig.file));
        }
        const winstonLogger = new winston.createLogger({
            format: combine(
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                splat(),
                myFormat
            ),
            transports: winstonTransport,
            exitOnError: false,
            label: label
        });
        winstonLogger.stream = {
            write: function (message, encoding) {
                winstonLogger.info(message);
            }
        };

        return winstonLogger;
    }
}

module.exports = LoggerFactory;