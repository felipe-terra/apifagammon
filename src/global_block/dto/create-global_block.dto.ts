import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateGlobalBlockDto {

    
    id_user_blocking: number;

    @ApiProperty({ example: 8 })

    @IsNumber()
    id_place_configuration: number;

    @ApiProperty({ example: 'Motivo do bloqueio' })
    @IsString()
    reason: string;

    @ApiProperty({ example: '2023-12-01' })
    @IsDate()
    @Type(() => Date)
    date: Date;
}
