import applicationProvider from "./provider/Application.provider";
import sequelizeProvider from './provider/Sequelize.provider';
import cacheProvider from './provider/Cache.provider';

applicationProvider.loadServer();
sequelizeProvider.startDatabase();
cacheProvider.startCache();
