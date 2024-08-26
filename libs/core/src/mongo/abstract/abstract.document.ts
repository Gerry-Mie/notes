import { ApiProperty } from '@nestjs/swagger';

export class AbstractDocument {
    @ApiProperty({ type: String })
    _id: string;

    @ApiProperty()
    created_at: string;

    @ApiProperty()
    updated_at: string;
}
