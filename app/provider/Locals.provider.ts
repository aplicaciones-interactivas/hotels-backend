import {Application} from "express";
import dotEnvFlow from "dotenv-flow";
import toBoolean = require("validator/lib/toBoolean");

export class LocalsProvider {

    public static config() {
        dotEnvFlow.config({
            path: './conf'
        });
    }

    public static getConfig() {
        const apiPrefix = process.env.API_PREFIX || 'api';
        const port = process.env.PORT || 4040;
        const url = process.env.APP_URL || `http://localhost:` + port;
        const dbHost = process.env.SEQUELIZE_DB_HOST || 'localhost';
        const dbPort = process.env.SEQUELIZE_DB_PORT || 3306;
        const dbUsername = process.env.SEQUELIZE_DB_USERNAME || 'root';
        const dbPassword = process.env.SEQUELIZE_DB_PASSWORD || undefined;
        const dbDialect: string = process.env.SEQUELIZE_DB_DIALECT || 'mysql';
        const database: string = process.env.SEQUELIZE_DB_DATABASE || 'hotels';
        const showSql: boolean = toBoolean(process.env.SEQUELIZE_SHOW_SQL || 'false');
        const cacheHost = process.env.REDIS_HOST || undefined;
        const cachePort = process.env.REDIS_PORT || undefined;
        const cacheUsername = process.env.REDIS_USERNAME || undefined;
        const cachePassword = process.env.REDIS_PASSWORD || undefined;
        const logLevel = process.env.LOG_LEVEL || 'Debug';
        const jwtSecret = process.env.JWT_SECRET;

        return {
            url,
            port,
            apiPrefix,
            logLevel,
            db: {
                dbHost,
                dbPort,
                dbUsername,
                dbPassword,
                dbDialect,
                database,
                showSql
            },
            redis: {
                redisHost: cacheHost,
                redisPassword: cachePassword,
                redisPort: cachePort,
                redisUsername: cacheUsername
            },
            jwtsecret: jwtSecret
        }
    }

    public static init(_express: Application): Application {
        _express.locals.app = this.getConfig();
        return _express;
    }

}
