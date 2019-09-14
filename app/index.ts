import applicationProvider from "./provider/Application.provider";
import sequelizeProvider from './provider/TypeORM.provider';
import cacheProvider from './provider/Cache.provider';
import passport from './provider/Passport';

applicationProvider.loadServer();
sequelizeProvider.startDatabase();
cacheProvider.startCache();
passport.initAuth();

