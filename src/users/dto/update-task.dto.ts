import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTaskDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    readonly name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly description?: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    readonly completed?: boolean;
}
