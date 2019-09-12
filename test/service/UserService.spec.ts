import "mocha";
import {UserRequest} from "../../app/api/request/User.request";
import {User} from "../../app/entities/User";
import UserService from "../../app/services/User.service";
import UserServiceImpl from "../../app/services/impl/User.service.impl";
import {getRepository} from "typeorm";
import {Repository} from "typeorm";
import {expect} from "chai";
import bcrypt from "bcryptjs"

describe("UserService.create", () => {


    const r: Repository<User> = getRepository(User);
    const userService: UserService = new UserServiceImpl(r);

    it('with valid user, should return user with encrypted password', async () => {
        const user: UserRequest = {
            username: 'aFlores',
            password: '123456',
            email: 'aFlores@cvc.com',
            organizationId: 1,
            rolesId: [1]
        };
        const createdUser = await userService.create(user);
        expect(createdUser.password).is.not.eql("123456");
        expect(bcrypt.compareSync('123456', createdUser.password)).is.true;
    });
});