import {UserService} from "../User.service";
import {CreateUserRequest} from "../../api/request/user/CreateUser.request";
import UserResponse from "../../api/response/User.response";
import {User} from "../../entities/User";
import {Repository} from "typeorm";
import {UpdateUserRequest} from "../../api/request/user/UpdateUser.request";
import {NoSuchElementError} from "../../error/NoSuchElement.error";
import {BCryptUtils} from "../../utils/BCrypt.utils";
import {inject, injectable} from "inversify";
import {UserRepository} from "../../repository/User.repository";

@injectable()
export default class UserServiceImpl implements UserService {
    private userRepository: Repository<User>;
    private noSuchElementByIdMessage = "Unable to find user with id: ";
    private noSuchElementByUsernameOrEmailMessage = "Unable to find user with param: ";

    constructor(@inject(UserRepository) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async create(userRequest: CreateUserRequest): Promise<UserResponse> {
        let user: any = this.userRepository.create(userRequest);
        user.password = BCryptUtils.hash(userRequest.password);
        let id = await this.userRepository.createQueryBuilder().insert().values(user).execute();
        user.id = id.raw.insertId;
        await this.userRepository.createQueryBuilder().relation(User, "roles").of(user).add(userRequest.rolesId);
        await this.userRepository.createQueryBuilder().relation(User, "organization").of(user).set(userRequest.organizationId);
        user = await this.userRepository.preload(user);
        return this.toResponse(user);
    }

    private toResponse(user: User): UserResponse {
        let userResponse: UserResponse = {
            id: user.id,
            email: user.email,
            password: user.password,
            username: user.username,
            rolesId: user.roles.map((rol) => {
                return {id: rol.id, roleName: rol.roleName}
            })
        };

        if (user.organization) {
            userResponse.organizationId = user.organization.id;
        }

        return userResponse;
    }

    async update(id: number, userRequest: UpdateUserRequest): Promise<UserResponse | undefined> {
        let user: User | undefined = await this.userRepository.findOne(id);
        if (userRequest.password || userRequest.email) {
            if (user) {
                if (userRequest.email) {
                    user.email = userRequest.email;
                }
                if (userRequest.password) {
                    user.password = BCryptUtils.hash(userRequest.password);
                }
                return this.toResponse(await this.userRepository.save(user));
            } else {
                throw new NoSuchElementError(this.noSuchElementByIdMessage + id);
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

    async findByUsernameOrEmail(param: string): Promise<UserResponse> {
        let user = (await this.userRepository.find({
            where: [{username: param}, {email: param}]
        }))[0];
        if (user) {
            return this.toResponse(user);
        } else {
            throw new NoSuchElementError(this.noSuchElementByUsernameOrEmailMessage + param);
        }
    }

}
