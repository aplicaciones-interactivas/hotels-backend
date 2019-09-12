import applicationProvider from "./provider/Application.provider";
import sequelizeProvider from './provider/TypeORM.provider';
import cacheProvider from './provider/Cache.provider';

applicationProvider.loadServer();
sequelizeProvider.startDatabase();
cacheProvider.startCache();
