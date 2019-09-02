import {Sequelize} from 'sequelize-typescript';
import {LocalsProvider} from "./Locals.provider";
import {Dialect} from "sequelize";

class SequelizeProvider {

    public startDatabase(): Sequelize {
        const locals = LocalsProvider.config();

        let options = {
            database: locals.db.database,
            dialect: locals.db.dbDialect,
            username: locals.db.dbUsername,
            password: locals.db.dbPassword,
            models: [__dirname + '../models'],
            storage: locals.db.storage
        };

        //@ts-ignore
        return new Sequelize(options);
    }

}

export default new SequelizeProvider();
