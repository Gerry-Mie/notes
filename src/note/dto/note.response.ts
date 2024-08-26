import { Paginated } from '@app/core/mongo/mongo.poginated';
import { Note } from '../note.model';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDocument } from '@app/core/mongo/abstract/abstract.document';

export class NoteResponse extends Note implements AbstractDocument {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    created_at: string;

    @ApiProperty()
    updated_at: string;
}

export class PaginatedNoteResponse extends Paginated<NoteResponse> {
    @ApiProperty({ type: [NoteResponse] })
    docs: NoteResponse[];
}
