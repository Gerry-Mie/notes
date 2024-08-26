import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { NoteRepository } from './note.repository';
import { MongoModule } from '@app/core/mongo';
import { Note } from './note.model';
import { UserModule } from '../user/user.module';

@Module({
    imports: [MongoModule.forFeatures([Note]), UserModule],
    controllers: [NoteController],
    providers: [NoteService, NoteRepository],
})
export class NoteModule {}
