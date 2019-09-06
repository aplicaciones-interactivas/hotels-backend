import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import {SimpleBaseRepository} from "../../app/repository/generics/SimpleBaseRepository";
import {Bed} from "../../app/models/Bed";

describe('findAll', () => {

    const repository: SimpleBaseRepository<Bed, number> = new (class extends SimpleBaseRepository<Bed, number> {
    })(Bed);

    before(async () => {
        await Bed.create({
            name: 'King Size',
            code: "KS"
        });
    });

    it('should return list of persisted entities', async () => {
        let result = await repository.findAll();
        expect(result).has.length(1);
    });


});
