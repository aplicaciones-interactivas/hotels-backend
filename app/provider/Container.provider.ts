import {Container} from "inversify";
import {UserService} from "../services/User.service";
import UserServiceImpl from "../services/impl/User.service.impl";
import {UserRepository} from "../repository/User.repository";
import {getCustomRepository} from "typeorm";

export class ContainerProvider {
    public provide(): Container {
        let container: Container = new Container();
        container.bind<UserService>("UserService").to(UserServiceImpl);
        container.bind<UserRepository>("UserRepository").toDynamicValue(() => getCustomRepository(UserRepository)).inSingletonScope();
        return container;
    }
}