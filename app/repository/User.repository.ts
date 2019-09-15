import {EntityRepository, Repository} from "typeorm";
import {User} from "../entities/User";
import {injectable} from "inversify";

@EntityRepository(User)
@injectable()
export class UserRepository extends Repository<User> {

}