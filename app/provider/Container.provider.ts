import {Container} from "inversify";
import {UserService} from "../services/User.service";
import UserServiceImpl from "../services/impl/User.service.impl";
import {UserRepository} from "../repository/User.repository";
import {getCustomRepository} from "typeorm";
import {ApplicationProvider} from "./Application.provider";
import {CacheProvider} from "./Cache.provider";

export class ContainerProvider {
    public provide(): Container {
        let container: Container = new Container();
        container.bind<UserService>("UserService").to(UserServiceImpl);
        container.bind<UserRepository>("UserRepository").toDynamicValue(() => getCustomRepository(UserRepository)).inSingletonScope();
        container.bind<ApplicationProvider>("ApplicationProvider").to(ApplicationProvider);
        container.bind<CacheProvider>("CacheProvider").to(CacheProvider);
        return container;
    }
}