import applicationProvider from "./provider/Application.provider";
import sequelizeProvider from './provider/Sequelize.provider';

applicationProvider.loadServer();
sequelizeProvider.startDatabase();
