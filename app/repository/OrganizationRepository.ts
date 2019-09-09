import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {Organization} from "../models/Organization";

export class OrganizationRepository extends SimpleBaseRepository<Organization> {
    constructor() {
        super(Organization);
    }
}