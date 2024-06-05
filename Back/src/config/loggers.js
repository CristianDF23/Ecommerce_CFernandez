import config from "./command.dotenv.js";
import winston from "winston";

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
};

winston.addColors(customLevelsOptions.colors);

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: './errors.log', level: 'error' })
    ]
});

export const addLogger = (req, res, next) => {
    if (config.mode === 'prod') {
        req.logger = prodLogger;
    } else {
        req.logger = devLogger;
    }
    next();
};