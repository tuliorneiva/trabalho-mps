import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    readonly email: string;
}

