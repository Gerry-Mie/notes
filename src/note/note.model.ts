import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractDocument } from '@app/core/mongo/abstract/abstract.document';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';

@Schema({ timestamps: true })
export class Note {
    @ApiProperty()
    @Prop()
    title: string;

    @ApiProperty()
    @Prop()
    content: string;

    @ApiProperty()
    @Prop({ type: mongoose.Types.ObjectId, ref: User.name, index: true })
    user: string | User;
}

export type NoteDocument = HydratedDocument<Note & AbstractDocument>;
