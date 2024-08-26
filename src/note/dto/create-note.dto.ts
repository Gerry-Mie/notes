import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateNoteDto {
    @ApiProperty()
    @IsString()
    @Length(2, 50)
    title: string;

    @ApiProperty()
    @IsString()
    @Length(2, 500)
    content: string;
}
