import {ApplicationProvider} from "./provider/Application.provider";
import {TypeORMProvider} from './provider/TypeORM.provider';
import {CacheProvider} from './provider/Cache.provider';
import {PassportProvider} from './provider/Passport.provider';
import {ContainerProvider} from "./provider/Container.provider";

(async () => {
    let container = new ContainerProvider().provide();
    await new TypeORMProvider().startDatabase();
    new CacheProvider().startCache();
    new ApplicationProvider().loadServer();
    container.resolve(PassportProvider).init();
})();

