// Logger Settings

// import and config
const { format, createLogger, transports } = require('winston');
const { combine, colorize, errors, timestamp, printf } = format;


// Logger settings function
const buildLogger = () => {

    // format for logger 
    const myFormat = printf(({ level, message, stack, timestamp }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    // logger options
    return createLogger({
        format: combine(
            colorize(),
            errors({ stack: true }),
            timestamp({ format: 'YYYY-MM-DD hh-mm-ss' }),
            myFormat
        ),
        level: "debug",
        transports: [new transports.Console()],
    });
};


// Config logger
const logger = buildLogger();

// export logger
module.exports = logger;