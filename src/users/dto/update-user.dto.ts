import { IsOptional, IsString, IsEmail, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    readonly name?: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    readonly email?: string;

    @IsOptional()
    @IsBoolean()
    readonly active?: boolean;
}

