import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import {SimpleBaseRepository} from "../../app/repository/generics/SimpleBaseRepository";
import {Bed} from "../../app/models/Bed";

describe('Hello function', () => {

    const repository: SimpleBaseRepository<Bed, number> = new class extends SimpleBaseRepository<Bed, number> {
    };

    before(async () => await new Bed({
        name: 'King Size',
        code: "KS"
    }));

    it('should return list of entity', () => {
        repository.findAll().then((result) => {
            expect(result).has.length(1);
        })
    });

});
