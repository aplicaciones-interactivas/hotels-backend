import {CreateUserRequest} from "../api/request/user/CreateUser.request";
import UserResponse from "../api/response/User.response";
import {UpdateUserRequest} from "../api/request/user/UpdateUser.request";


export interface UserService {
    create(user: CreateUserRequest): Promise<UserResponse>;

    update(id: number, user: UpdateUserRequest): Promise<UserResponse | undefined>;

    findById(id: number): Promise<UserResponse>;

    findByOrganizationId(organizationId: number): Promise<UserResponse[]>;

    findByUsernameOrEmail(param : string): Promise<UserResponse>;
}