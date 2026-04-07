import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class PasswordNotContainsLoginConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string, args: ValidationArguments) {
    const obj = args.object as Record<string, unknown>;
    const login = obj.login;
    if (typeof login !== "string" || !password) {
      return true;
    }
    // case-insensitive
    return !password.toLowerCase().includes(login.toLowerCase());
  }

  defaultMessage() {
    return "A senha não pode conter o login do usuário";
  }
}

export function PasswordNotContainsLogin(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordNotContainsLoginConstraint,
    });
  };
}
