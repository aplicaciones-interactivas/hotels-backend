import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {User} from "../models/User";

export class UserRepository extends SimpleBaseRepository<User> {
    constructor() {
        super(User);
    }
}