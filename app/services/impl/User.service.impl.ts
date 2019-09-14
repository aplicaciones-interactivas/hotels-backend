import UserService from "../User.service";
import {CreateUserRequest} from "../../api/request/user/CreateUser.request";
import UserResponse from "../../api/response/User.response";
import {User} from "../../entities/User";
import {Repository} from "typeorm";
import bcrypt from "bcryptjs";
import {UpdateUserRequest} from "../../api/request/user/UpdateUser.request";
import {NoSuchElementError} from "../../error/NoSuchElement.error";
import {throws} from "assert";

export default class UserServiceImpl implements UserService {
    private ROUNDS_SALT = 8;
    private userRepository: Repository<User>;
    private noSuchElementByIdMessage = "Unable to find user with id: ";

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async create(userRequest: CreateUserRequest): Promise<UserResponse> {
        let user: any = this.userRepository.create(userRequest);
        user.password = await this.hashPassword(user.password);
        let id = await this.userRepository.createQueryBuilder().insert().values(user).execute();
        user.id = id.raw.insertId;
        await this.userRepository.createQueryBuilder().relation(User, "roles").of(user).add(userRequest.rolesId);
        await this.userRepository.createQueryBuilder().relation(User, "organization").of(user).set(userRequest.organizationId);
        user = await this.userRepository.preload(user);
        return this.toResponse(user);
    }

    async hashPassword(password: string): Promise<string> {
        let salt = await bcrypt.genSalt(this.ROUNDS_SALT);
        return await bcrypt.hash(password, salt);
    }

    private toResponse(user: User): UserResponse {
        return {
            id: user.id,
            email: user.email,
            organizationId: user.organization.id,
            password: user.password,
            rolesId: user.roles.map((rol) => {
                return {id: rol.id, roleName: rol.roleName}
            }),
            username: user.username
        }
    }

    async update(id: number, userRequest: UpdateUserRequest): Promise<UserResponse | undefined> {
        let user: User | undefined = await this.userRepository.findOne(id);
        if (userRequest.password || userRequest.email) {
            if (user) {
                if (userRequest.email) {
                    user.email = userRequest.email;
                }
                if (userRequest.password) {
                    user.password = await this.hashPassword(userRequest.password);
                }
                return this.toResponse(await this.userRepository.save(user));
            } else {
                throw new NoSuchElementError("Unable to find user with id: " + id);
            }
        }
        return user ? this.toResponse(user) : undefined;
    }

    async findById(id: number): Promise<UserResponse> {
        let user = await this.userRepository.findOne(id);
        if (user) {
            return this.toResponse(user);
        } else {
            throw new NoSuchElementError(this.noSuchElementByIdMessage + id);
        }
    }

    async findByOrganizationId(organizationId: number): Promise<UserResponse[]> {
        let users = await this.userRepository.find({
            where: {
                organization: {
                    id: organizationId
                }
            }
        });
        return users.map(this.toResponse);
    }

}
