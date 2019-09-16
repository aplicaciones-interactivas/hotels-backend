import {LocalsProvider} from "./Locals.provider";
import {LoggerProvider} from './Logger.provider'
import {Connection, ConnectionOptions, createConnection, QueryRunner} from "typeorm";
import {Logger} from "typescript-logging";
import {Logger as TypeORMLogger} from "typeorm";

export class TypeORMProvider {
    _connection !: Connection;
    logger: Logger = LoggerProvider.getLogger(TypeORMProvider.name);

    public async startDatabase(): Promise<Connection> {
        const locals = LocalsProvider.getConfig();
        let opts: ConnectionOptions = {
            //@ts-ignore
            type: locals.db.dbDialect,
            host: locals.db.dbHost,
            port: locals.db.dbPort,
            username: locals.db.dbUsername,
            password: locals.db.dbPassword,
            database: locals.db.database,
            logging: "all",
            //@ts-ignore
            entities: [__dirname.replace("provider", "entities/*.ts")],
            connectTimeout: 600000,
            logger: new CustomLogger()
        };
        this.logger.debug("Waiting for " + locals.db.dbDialect + " is ready for accept transactions");
        for (; ;) {
            try {
                let connection = await createConnection(opts);
                this._connection = connection;
                break;
            } catch (err) {
                await this.sleep(5000);
            }
        }
        this.logger.debug("Connection started!");
        return this._connection;
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    get connection() {
        return this._connection;
    }

}

class CustomLogger implements TypeORMLogger {
    logger: Logger = LoggerProvider.getLogger("TypeORM");

    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
        if (level == "log" || level == "info") {
            this.logger.info(message);
        } else {
            this.logger.warn(message);
        }
    }

    logMigration(message: string, queryRunner?: QueryRunner): any {
        this.logger.debug(message);
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.logger.debug(query + " values: " + parameters);
    }

    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.logger.error(error + " values: " + parameters);
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this.logger.debug(query + " values: " + parameters);
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        this.logger.debug(message);
    }

}

export default new TypeORMProvider();