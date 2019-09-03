import { expect } from 'chai';
import 'mocha';
import {User} from "../../app/models/User";
import {SimpleBaseRepository} from "../../app/repository/generics/SimpleBaseRepository";

describe('Hello function', () => {

    const repository : SimpleBaseRepository<User, number> = new class extends SimpleBaseRepository<User, number> {};

    it('should return list of entity', () => {
        repository.findAll().then((result) => {
            expect(result).has.length(1);
        })
    });

});
