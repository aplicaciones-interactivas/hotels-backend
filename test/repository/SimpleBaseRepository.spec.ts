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
    it('with not existent id, should return null', async () => {
        let result = await repository.findById(200000);
        expect(result).to.be.null;
    });
});

describe('deleteById', () => {
    it('with existing id, should delete entity with id', async () => {
        let before: any = await sequelizeProvider.sequelize.query("select count(*) from Beds", {type: QueryTypes.SELECT});
        await repository.deleteById(1);
        let after: any = await sequelizeProvider.sequelize.query("select count(*) from Beds", {type: QueryTypes.SELECT});
        expect(after[0]["count(*)"]).eqls(before[0]["count(*)"] - 1);
        //restore deleted entity
        await sequelizeProvider.sequelize.query("INSERT INTO Beds(id, name,code) VALUES (1,'Single', 'SB');");
    });
});

describe('existsById', () => {
    it('with existing id, should return true', async () => {
        let exists = await repository.existsById(1);
        expect(exists).to.be.true;
    });
    it('with non existent id, should return false', async () => {
        let exists = await repository.existsById(200000);
        expect(exists).to.be.false;
    })
});