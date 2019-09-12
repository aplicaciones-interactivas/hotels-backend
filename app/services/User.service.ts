import {UserRequest} from "../api/request/User.request";
import UserResponse from "../api/response/User.response";


export default interface UserService {
    create(user: UserRequest): Promise<UserResponse>;
}