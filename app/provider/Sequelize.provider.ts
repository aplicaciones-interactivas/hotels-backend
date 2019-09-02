import {Sequelize} from 'sequelize-typescript';
import {LocalsProvider} from "./Locals.provider";
import {Dialect} from "sequelize";

class SequelizeProvider {

    public startDatabase(): Sequelize {
        const locals = LocalsProvider.config();

        let options = {
            database: locals.database,
            dialect: locals.dbDialect,
            username: locals.dbUsername,
            password: locals.dbPassword,
            models: [__dirname + '../models'],
            storage: locals.storage
        };

        //@ts-ignore
        return new Sequelize(options);
    }

}

export default new SequelizeProvider();
