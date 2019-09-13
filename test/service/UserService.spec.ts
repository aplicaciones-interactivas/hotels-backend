import "mocha";
import {CreateUserRequest} from "../../app/api/request/user/CreateUser.request";
import {User} from "../../app/entities/User";
import UserService from "../../app/services/User.service";
import UserServiceImpl from "../../app/services/impl/User.service.impl";
import {getConnection, getRepository} from "typeorm";
import {Repository} from "typeorm";
import bcrypt from "bcryptjs"
import {expect} from "chai";
import {UpdateUserRequest} from "../../app/api/request/user/UpdateUser.request";
import {Organization} from "../../app/entities/Organization";
import {Role} from "../../app/entities/Role";
import {seeder} from "../seeders/MySql.seeder";
import UserResponse from "../../app/api/response/User.response";
import {NoSuchElementError} from "../../app/error/NoSuchElement.error";
import {ValidationError} from "class-validator";

const r: Repository<User> = getRepository(User);
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
        await userService.create(user).catch(err => {
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
})