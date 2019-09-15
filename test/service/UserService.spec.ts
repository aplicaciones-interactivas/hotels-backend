import "mocha";
import {CreateUserRequest} from "../../app/api/request/user/CreateUser.request";
import {User} from "../../app/entities/User";
import {UserService} from "../../app/services/User.service";
import UserServiceImpl from "../../app/services/impl/User.service.impl";
import {getConnection, getCustomRepository, getRepository} from "typeorm";
import {Repository} from "typeorm";
import bcrypt from "bcryptjs"
import {expect} from "chai";
import {UpdateUserRequest} from "../../app/api/request/user/UpdateUser.request";
import {Organization} from "../../app/entities/Organization";
import {Role} from "../../app/entities/Role";
import {NoSuchElementError} from "../../app/error/NoSuchElement.error";
import UserResponse from "../../app/api/response/User.response";
import {UserRepository} from "../../app/repository/User.repository";

const r: UserRepository = getCustomRepository(UserRepository);
const userService: UserService = new UserServiceImpl(r);

describe("UserService.create", () => {

    it('with valid user, should return user with encrypted password', async () => {

        const user: CreateUserRequest = {
            username: 'juanesnow',
            password: '123456',
            email: 'aFlores@cvc.com',
            organizationId: 1,
            rolesId: [1]
        };
        const createdUser = await userService.create(user);
        expect(createdUser.password).is.not.eql("123456");
        expect(bcrypt.compareSync('123456', createdUser.password)).is.true;
    });

    it('with non unique username, should throw error', async () => {
        const user: CreateUserRequest = {
            username: 'gusRozengardt',
            password: '123456',
            email: 'gusRozengardt@cvc.com',
            organizationId: 1,
            rolesId: [1]
        };
        await userService.create(user);
        let before = await getConnection().createQueryBuilder().select("user").from(User, "user").getCount();
        await userService.create(user).catch((err: any) => {
            expect(err.constructor.name).eql("QueryFailedError");
        });
        let after = await getConnection().createQueryBuilder().select("user").from(User, "user").getCount();
        expect(after).eql(before);
    });

});

describe('UserService.update', () => {
    it('with valid id, update password and email, should return updated entity', async () => {
        let id = 1;
        let password = "password";
        let userBefore = (await getConnection().createQueryBuilder().select().from(User, "user").where({id: id}).execute())[0];
        let usersBefore = await getConnection().createQueryBuilder().select().from(User, "user").getCount();
        let organizationsBefore = await getConnection().createQueryBuilder().select().from(Organization, "organization").getCount();
        let rolesBefore = await getConnection().createQueryBuilder().select().from(Role, "role").getCount();
        let user: UpdateUserRequest = {
            password: password,
            email: "nuevoEmail@gmail.com"
        };
        let updatedUser = await userService.update(id, user);
        let usersAfter = await getConnection().createQueryBuilder().select().from(User, "user").getCount();
        let organizationsAfter = await getConnection().createQueryBuilder().select().from(Organization, "organization").getCount();
        let rolesAfter = await getConnection().createQueryBuilder().select().from(Role, "role").getCount();
        //@ts-ignore
        expect(updatedUser.email).not.eql(userBefore.email);
        //@ts-ignore
        expect(updatedUser.username).eql(userBefore.username);
        //@ts-ignore
        expect(updatedUser.organizationId).not.null;
        //@ts-ignore
        expect(updatedUser.rolesId).is.not.empty;
        //@ts-ignore
        expect(bcrypt.compareSync(password, updatedUser.password)).is.true;
        expect(usersBefore).eql(usersAfter);
        expect(organizationsBefore).eql(organizationsAfter);
        expect(rolesBefore).eql(rolesAfter);
    });

    it('with valid id, update password, should return updated entity', async () => {
        let id = 1;
        let password = "password";
        let userBefore = (await getConnection().createQueryBuilder().select().from(User, "user").where({id: id}).execute())[0];
        let userRequest: UpdateUserRequest = new UpdateUserRequest();
        userRequest.password = password;
        let updatedUser = await userService.update(id, userRequest);
        //@ts-ignore
        expect(bcrypt.compareSync(password, updatedUser.password)).is.true;
        //@ts-ignore
        expect(updatedUser.email).eql(userBefore.email);
    });

    it('with valid id, update email, should return updated entity', async () => {
        let id = 1;
        let userBefore = (await getConnection().createQueryBuilder().select().from(User, "user").where({id: id}).execute())[0];
        let userRequest: UpdateUserRequest = new UpdateUserRequest();
        userRequest.email = "nuevoEmail2@gmail.com";
        let updatedUser = await userService.update(id, userRequest);
        //@ts-ignore
        expect(userBefore.password).eql(updatedUser.password);
        //@ts-ignore
        expect(updatedUser.email).not.eql(userBefore.email);
    });

    it('with valid id, without update, do nothig', async () => {
        let id = 1;
        let userBefore = (await getConnection().createQueryBuilder().select().from(User, "user").where({id: id}).execute())[0];
        let userRequest: UpdateUserRequest = new UpdateUserRequest();
        let updatedUser = await userService.update(id, userRequest);
        //@ts-ignore
        expect(updatedUser.password).eql(userBefore.password);
        //@ts-ignore
        expect(updatedUser.email).eql(userBefore.email);
    });

    it('with invalid id, should throw error', async () => {
        let id = 1000000;
        let userRequest: UpdateUserRequest = {
            password: "anypass",
            email: "nuevoEmail@gmail.com"
        };
        await userService.update(id, userRequest).should.be.rejectedWith(NoSuchElementError);
    });
});

describe('UserService.findById', () => {
    it('with valid id, should return user', async () => {
        await expect(userService.findById(1)).to.eventually.have.property('id').eql(1);
    });

    it('with invalid id, should return user', async () => {
        await userService.findById(10000).should.be.rejectedWith(NoSuchElementError);
    });
});

describe('UserService.findByOrganizationId', () => {
    it('with valid organization id, should return all users of organization', async () => {
        let id = 1;
        let users = await userService.findByOrganizationId(id);
        expect(users).to.has.length((await getConnection().createQueryBuilder().from(User, "user").where({organization: {id: id}}).getCount()));
    });
    it('with invalid organization id, should return empty list', async () => {
        let id = 100000;
        let users = await userService.findByOrganizationId(id);
        expect(users).to.has.length(0);
    });
});

describe('UserService.findByUsernameOrEmail', () => {
    it('with valid username must return user', async () => {
        let username = "jhondoe";
        let user: UserResponse = await userService.findByUsernameOrEmail(username);
        expect(user.username).eql(username);
    });

    it('with invalid username should throw error', async () => {
        await userService.findByUsernameOrEmail("invalidusername").should.be.rejectedWith(NoSuchElementError);
    });

    it('with valid email must return user', async () => {
        let email = "jhon.doe@gmail.com";
        let user: UserResponse = await userService.findByUsernameOrEmail(email);
        expect(user.email).eql(email);
    });
    it('with invalid email must return user', async () => {
        await userService.findByUsernameOrEmail("jhon.doe.invalid@gmail.com").should.be.rejectedWith(NoSuchElementError);
    });
});