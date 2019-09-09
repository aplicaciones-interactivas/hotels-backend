import {DataType, Sequelize} from 'sequelize-typescript';
import {LocalsProvider} from "./Locals.provider";
import {LoggerProvider} from './Logger.provider'

class SequelizeProvider {

    _sequelize! : Sequelize;
    private getLogger(needLogger: boolean) {
        return needLogger ? function (...args: any) {
            LoggerProvider.getLogger("sequelize").debug(args[0]);
        } : false;
    }

    public startDatabase(): Sequelize {
        const locals = LocalsProvider.getConfig();

        let options = {
            database: locals.db.database,
            dialect: locals.db.dbDialect,
            username: locals.db.dbUsername,
            password: locals.db.dbPassword,
            port: locals.db.dbPort,
            host: locals.db.dbHost,
            models: [__dirname.replace("provider", "models/relationship"), __dirname.replace("provider", "models")],
            logging: this.getLogger(locals.db.showSql),
            dialectOptions: {
                multipleStatements: true
            },
            define: {
                timestamps: false
            }
        };

        //@ts-ignore
        this._sequelize = new Sequelize(options);

        return this._sequelize;
    }

    get sequelize() {
        return this._sequelize
    }

}

export default new SequelizeProvider();
