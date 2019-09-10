import {expect} from 'chai';
import {describe, it, before} from 'mocha';
import {Bed} from "../../app/models/Bed";
import sequelizeProvider from '../../app/provider/Sequelize.provider';
import {QueryTypes} from "sequelize";

import {UserRepository} from "../../app/repository/UserRepository";
import {User} from "../../app/models/User";
import {JoinableBaseRepository} from "../../app/repository/generics/JoinableBaseRepository";
import {Role} from "../../app/models/Role";
import {
    AllowNull,
    AutoIncrement, BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Is,
    IsEmail,
    PrimaryKey,
    Unique
} from "sequelize-typescript";
import {UsernameValidator} from "../../app/models/validations/impl/UsernameValidator";
import {Organization} from "../../app/models/Organization";
import {UserRole} from "../../app/models/relationship/UserRole";

const repository: JoinableBaseRepository<User> = new UserRepository();
const roleInclude = {
    model: Role
};
describe('JoinableBaseRepository.findAll', () => {
    it('with include, should return entity with associations', async () => {
        let users = await repository.findAll(undefined, roleInclude);
        users.forEach((user) => {
            expect(user.roles).to.has.length(1);
        });
        expect(users[0].roles[0].roleName).to.be.eqls('ADMIN');
        expect(users[1].roles[0].roleName).to.be.eqls('USER');
    });
});

describe('JoinableBaseRepository.findById', () => {
    it('with include, should return entity with associations', async () => {
        let user = await repository.findById(1, roleInclude);
        expect(user.roles).to.has.length(1);
        expect(user.roles[0].roleName).to.be.eqls('ADMIN');
    });
});

describe('JoinableBaseRepository.create', () => {
    it('with include and set relationship, should return entity with associations', async () => {
        let user = await repository.create({
            username: 'newUserToPersist',
            password: '123456',
            email: 'newUser@mail.com',
            organizationId: 1,
            roles: [2]
        }, roleInclude);
        expect(user.id).to.be.not.null;
        expect(user.roles).to.has.length(1);
        expect(user.roles[0].roleName).to.be.eqls('USER');
        await user.destroy();
    });
    /*it('with include, without required relationship, should throw error', async () => {
        expect(await handleError(async () => await repository.create({
            username: 'newUserToPersist',
            password: '123456',
            email: 'newUser@mail.com',
            organizationId: 1,
            roles: []
        }, roleInclude))).is.not.undefined;

    });*/
});

describe('JoinableBaseRepository.update', () => {
    it('with include and set relationship, should return entity with associations', async () => {
        let user = await repository.update(1,{
            username: 'hernandezed',
            password: '123456',
            email: 'newUser@mail.com',
            organizationId: 2,
        }, roleInclude);
        expect(user.id).to.be.eqls(1);
        expect(user.username).to.be.eqls('hernandezed');
        expect(user.password).to.be.eqls('123456');
        expect(user.email).to.be.eqls('newUser@mail.com');
        expect(user.organizationId).to.be.eqls(2);
        expect(user.roles).to.has.length(1);
        expect(user.roles[0].roleName).to.be.eqls('ADMIN');
        await user.destroy();
        await sequelizeProvider.sequelize.query("INSERT INTO Users(id, username, password, email, organizationId) VALUES(1, 'edhernandez', '$2y$12$S8Qdgk2//.TuObluwUNEdeTpL1N6V8WH.umzzaxzsEeJSBI1f8maS', 'hernandezed.1991@cvc.com.br', 1)");
        await sequelizeProvider.sequelize.query("INSERT INTO UserRoles(userId, roleId) values(1,1),");
    });
});

async function handleError(func: Function): Promise<Error | undefined> {
    let error: Error | undefined;
    try {
        await func();
    } catch (err) {
        error = err;
    }
    return error;
}