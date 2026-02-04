import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, Matches, IsStrongPassword } from 'class-validator';
import { PasswordNotContainsLogin } from '../validators/password-not-contains-login.validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(12)
    @Matches(/^[a-zA-Z]+$/, {
        message: 'O login deve conter apenas letras (sem números)',
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
        message: 'A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
    })
    @PasswordNotContainsLogin({
        message: 'A senha não pode conter o login do usuário',
    })
    readonly password: string;
}

