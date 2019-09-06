import {Sequelize} from 'sequelize-typescript';
import {LocalsProvider} from "./Locals.provider";
import {Dialect} from "sequelize";

import {LoggerProvider} from './Logger.provider'
import {Logger} from "typescript-logging";

class SequelizeProvider {

    public startDatabase(): Sequelize {
        const locals = LocalsProvider.config();

        let options = {
            database: locals.db.database,
            dialect: locals.db.dbDialect,
            username: locals.db.dbUsername,
            password: locals.db.dbPassword,
            port: locals.db.dbPort,
            host: locals.db.dbHost,
            models: [__dirname.replace("provider", "models/relationship"),__dirname.replace("provider", "models")],
            storage: locals.db.storage
        };

        //@ts-ignore
        return new Sequelize(options);
    }

}

export default new SequelizeProvider();
