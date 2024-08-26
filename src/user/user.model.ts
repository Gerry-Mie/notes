import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { AbstractDocument } from '@app/core/mongo/abstract/abstract.document';

@Schema({ timestamps: true })
export class User {
    @ApiProperty()
    @Prop({ unique: true })
    uid: string;

    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    photoUrl: string;

    @ApiProperty()
    @Prop({ unique: true })
    email: string;

    @ApiProperty()
    @Prop({ default: false })
    isAdmin?: boolean;
}

export type UserDocument = HydratedDocument<User & AbstractDocument>;
