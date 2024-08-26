import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NoteRepository } from './note.repository';
import { DecodedIdToken } from '../auth/auth.types';
import { QParams } from '@app/core/utils';
import { UserRepository } from '../user/user.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
    constructor(
        private noteRepository: NoteRepository,
        private userRepository: UserRepository,
    ) {}

    async notes(auth: DecodedIdToken, qParams: QParams) {
        const user = await this.userRepository.getByEmail(auth.email);
        if (!user) throw new NotFoundException({ code: 'user-not-found' });
        return this.noteRepository.getUserNotes(user._id, qParams);
    }

    async getById(auth: DecodedIdToken, id: string) {
        const note = await this.noteRepository.getById(id);
        if (!note) throw new NotFoundException({ code: 'not-found' });
        const user = await this.userRepository.getByEmail(auth.email);
        if (note.user.toString() !== user._id.toString()) throw new UnauthorizedException({ code: 'unauthorized' });
        return note;
    }

    async create(auth: DecodedIdToken, data: CreateNoteDto) {
        const user = await this.userRepository.getByEmail(auth.email);
        if (!user) throw new NotFoundException({ code: 'user-not-found' });
        return this.noteRepository.create({ ...data, user: user._id });
    }

    async updateById(auth: DecodedIdToken, id: string, data: UpdateNoteDto) {
        await this.getById(auth, id);
        return this.noteRepository.updateById(id, data);
    }

    async deleteById(auth: DecodedIdToken, id: string) {
        await this.getById(auth, id);
        return this.noteRepository.deleteById(id);
    }
}
