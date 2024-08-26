import { IsBoolean, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPermissionDto {
    @ApiProperty()
    @IsBoolean()
    isAdmin: boolean;

    @ApiProperty()
    @IsEmail()
    email: string;
}
