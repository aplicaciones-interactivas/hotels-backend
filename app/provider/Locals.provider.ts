import {Application} from "express";

export class LocalsProvider {

    public static config() {

        /*
        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
                const port = process.env.PORT || 4040;
                const appSecret = process.env.APP_SECRET || 'This is your responsibility!';
                const mongooseUrl = process.env.MONGOOSE_URL;
                const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
                const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';

                const name = process.env.APP_NAME || 'NodeTS Dashboard';
                const keywords = process.env.APP_KEYWORDS || 'somethings';
                const year = (new Date()).getFullYear();
                const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
                const company = process.env.COMPANY_NAME || 'GeekyAnts';
                const description = process.env.APP_DESCRIPTION || 'Here goes the app description';

                const isCORSEnabled = process.env.CORS_ENABLED || true;
                const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;

                const logDays = process.env.LOG_DAYS || 10;

                const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
                const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;

                const redisHttpPort = process.env.REDIS_QUEUE_PORT || 6379;
                const redisHttpHost = process.env.REDIS_QUEUE_HOST || '127.0.0.1';
                const redisPrefix = process.env.REDIS_QUEUE_DB || 'q';
                const redisDB = process.env.REDIS_QUEUE_PREFIX || 3;
         */

        const apiPrefix = process.env.API_PREFIX || 'api';
        const port = process.env.PORT || 4040;
        const url = process.env.APP_URL || `http://localhost:`+ port;
        const dbHost = process.env.DB_HOST || 'localhost';
        const dbPort = process.env.DB_PORT || 3306;
        const dbUsername = process.env.DB_USERNAME || 'root';
        const dbPassword = process.env.DB_PASSWORD || '';
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
        _express.locals.app = this.config();
        return _express;
    }

}
