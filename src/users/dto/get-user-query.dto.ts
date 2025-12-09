import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserQueryDTO {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    offset?: number;
}

