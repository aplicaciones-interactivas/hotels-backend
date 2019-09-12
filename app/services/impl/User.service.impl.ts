import UserService from "../User.service";
import {UserRequest} from "../../api/request/User.request";
import UserResponse from "../../api/response/User.response";
import {User} from "../../entities/User";
import {Repository} from "typeorm";
import bcrypt from "bcryptjs"


export default class UserServiceImpl implements UserService {
    private ROUNDS_SALT = 8;
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async create(userRequest: UserRequest): Promise<UserResponse> {
        let user: any = this.userRepository.create(userRequest);
        let salt = await bcrypt.genSalt(this.ROUNDS_SALT);
        user.password = await bcrypt.hash(user.password, salt);
        let id = await this.userRepository.createQueryBuilder().insert().values(user).execute();
        user.id = id.raw.insertId;
        await this.userRepository.createQueryBuilder().relation(User, "roles").of(user).add(userRequest.rolesId);
        await this.userRepository.createQueryBuilder().relation(User, "organization").of(user).set(userRequest.organizationId);
        user = await this.userRepository.preload(user);
        return this.toResponse(user);
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


}