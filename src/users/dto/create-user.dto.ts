import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, Matches, IsStrongPassword } from 'class-validator';
import { PasswordNotContainsLogin } from '../validators/password-not-contains-login.validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(12)
    @Matches(/^[a-zA-Z]+$/, {
        message: 'The login must contain only letters (no numbers)',
    })
    readonly login: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character',
    })
    @PasswordNotContainsLogin({
        message: 'The password cannot contain the user login',
    })
    readonly password: string;
}

