import applicationProvider from "./provider/Application.provider";
import {TypeORMProvider} from './provider/TypeORM.provider';
import {CacheProvider} from './provider/Cache.provider';
import {PassportProvider} from './provider/Passport.provider';

(async () => {
    await new TypeORMProvider().startDatabase();
    new CacheProvider().startCache();
    applicationProvider.loadServer();
})();

