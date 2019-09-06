import {Application} from "express";
import dotEnvFlow from "dotenv-flow";

export class LocalsProvider {

    public static config() {
        dotEnvFlow.config({
            path: './app'
        });
    }

    public static getConfig() {
        const apiPrefix = process.env.API_PREFIX || 'api';
        const port = process.env.PORT || 4040;
        const url = process.env.APP_URL || `http://localhost:` + port;
        const dbHost = process.env.DB_HOST || 'localhost';
        const dbPort = process.env.DB_PORT || 3306;
        const dbUsername = process.env.DB_USERNAME || 'root';
        const dbPassword = process.env.DB_PASSWORD || undefined;
        const dbDialect: string = process.env.DB_DIALECT || 'mysql';
        const database: string = process.env.DB_DATABASE || 'hotels';
        const storage: string | undefined = process.env.DB_STORAGE || undefined;
        const cacheHost = process.env.REDIS_HOST || undefined;
        const cachePort = process.env.REDIS_PORT || undefined;
        const cacheUsername = process.env.REDIS_USERNAME || undefined;
        const cachePassword = process.env.REDIS_PASSWORD || undefined;
        const logLevel = process.env.LOG_LEVEL || 'Debug';

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
                storage
            },
            redis: {
                redisHost: cacheHost,
                redisPassword: cachePassword,
                redisPort: cachePort,
                redisUsername: cacheUsername
            }
        }
    }

    public static init(_express: Application): Application {
        _express.locals.app = this.getConfig();
        return _express;
    }

}
