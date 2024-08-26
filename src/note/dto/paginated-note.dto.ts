import { Paginated } from '@app/core/mongo/mongo.poginated';
import { Note } from '../note.model';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedNoteDto extends Paginated<Note> {
    @ApiProperty({ type: [Note] })
    docs: Note[];
}
