import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import {SimpleBaseRepository} from "../../app/repository/generics/SimpleBaseRepository";
import {Bed} from "../../app/models/Bed";
import sequelizeProvider from '../../app/provider/Sequelize.provider';
import {QueryTypes} from "sequelize";

const repository: SimpleBaseRepository<Bed, number> = new (class extends SimpleBaseRepository<Bed, number> {
})(Bed);
describe('findAll', () => {
    it('should return list of persisted entities', async () => {
        let result = await repository.findAll();
        let rawResult: any = await sequelizeProvider.sequelize.query("select count(*) from Beds", {type: QueryTypes.SELECT});
        rawResult = rawResult[0]["count(*)"];
        expect(result).has.length(rawResult);
    });
    it('with filter, should return list with one entity', async () => {
        let result = await repository.findAll({
            code: 'KB'
        });
        expect(result).has.length(1);
        expect(result[0]).to.have.property('code').eql('KB');
    });
});

describe('count', () => {
    it('should return quantity of entities persisted', async () => {
        let result = await repository.count();
        let rawResult: any = await sequelizeProvider.sequelize.query("select count(*) from Beds", {type: QueryTypes.SELECT});
        rawResult = rawResult[0]["count(*)"];
        expect(result).eqls(rawResult);
    });
    it('with filter, should return 1', async () => {
        let result = await repository.count({
            code: 'KB'
        });
        expect(result).eqls(1);
    });
});

describe('findById', () => {
    it('with existing id, should return entity by id', async () => {
        let result = await repository.findById(1);
        expect(result).property("code").eql('SB');
    });
});