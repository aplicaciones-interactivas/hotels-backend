export class CreateUserRequest {
    username!: string;
    password!: string;
    email!: string;
    organizationId!: number;
    rolesId!: number[];
}