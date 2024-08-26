import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './note.model';
import { PaginateModel, PaginateOptions } from 'mongoose';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteRepository {
    constructor(@InjectModel(Note.name) private noteModel: PaginateModel<NoteDocument>) {}

    getUserNotes(userId: string, options: PaginateOptions = {}) {
        return this.noteModel.paginate({ user: userId }, options);
    }

    async create(note: Note) {
        const newNote = await this.noteModel.create(note);
        return newNote.toJSON();
    }

    getById(id: string) {
        return this.noteModel.findById(id).lean<Note>();
    }

    updateById(id: string, data: UpdateNoteDto) {
        return this.noteModel.findByIdAndUpdate(id, { $set: data }, { new: true }).lean<Note>();
    }

    deleteById(id: string) {
        return this.noteModel.deleteOne({ _id: id }).lean<Note>();
    }
}
