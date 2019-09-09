import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {Role} from "../models/Role";

export class RoleRepository extends SimpleBaseRepository<Role> {
    constructor() {
        super(Role);
    }
}