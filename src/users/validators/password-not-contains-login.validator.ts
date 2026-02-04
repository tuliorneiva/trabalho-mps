import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordNotContainsLoginConstraint implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments) {
        const login = (args.object as any).login;
        if (!login || !password) {
            return true;
        }
        // case-insensitive
        return !password.toLowerCase().includes(login.toLowerCase());
    }

    defaultMessage(args: ValidationArguments) {
        return 'A senha não pode conter o login do usuário';
    }
}

export function PasswordNotContainsLogin(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: PasswordNotContainsLoginConstraint,
        });
    };
}

