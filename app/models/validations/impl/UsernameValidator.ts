import {Validator} from '../Validator';
import {ValidationErrorItem} from "sequelize";

export class UsernameValidator implements Validator<string> {
    private static readonly USERNAME_REGEX = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    validate(value: string): void {
        if(!UsernameValidator.USERNAME_REGEX.test(value)) {
            throw new ValidationErrorItem("Invalid username");
        }

    }
}