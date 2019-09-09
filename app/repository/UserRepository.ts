import {User} from "../models/User";
import {JoinableBaseRepository} from "./generics/JoinableBaseRepository";

export class UserRepository extends JoinableBaseRepository<User> {
    constructor() {
        super(User);
    }
}