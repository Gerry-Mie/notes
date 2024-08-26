import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Test } from '@nestjs/testing';
import { DecodedIdToken } from '../auth/auth.types';
import { QParams } from '@app/core/utils';
import { Note, NoteDocument } from './note.model'; // Ensure you have proper Note type or schema
import { PaginateResult } from 'mongoose';

const paginate = <T>(data: T[]): PaginateResult<T> => {
    return {
        docs: data,
    } as PaginateResult<T>;
};

describe('NoteController', () => {
    let noteController: NoteController;
    let noteService: NoteService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [NoteController],
            providers: [
                {
                    provide: NoteService,
                    useValue: {
                        notes: jest.fn(),
                        getById: jest.fn(),
                    },
                },
            ],
        }).compile();

        noteService = moduleRef.get<NoteService>(NoteService);
        noteController = moduleRef.get<NoteController>(NoteController);
    });

    describe('notes', () => {
        it('should return an array of notes', async () => {
            const mockNotes = paginate([
                { _id: '123123', title: 'Note1', content: 'Content1' },
            ]) as PaginateResult<NoteDocument>;

            const user = {
                email: 'user@example.com',
            } as unknown as DecodedIdToken;

            const qry: QParams = { limit: 10, page: 1, sort: 'orderBy' };

            jest.spyOn(noteService, 'notes').mockResolvedValue(mockNotes);

            const result = await noteController.notes(user, qry);
            expect(result).toEqual(mockNotes);
            expect(noteService.notes).toHaveBeenCalledWith(user, qry);
        });

        it('should return an empty array if no notes are found', async () => {
            const mockNote = paginate([]);
            const user = {
                email: 'user@example.com',
            } as unknown as DecodedIdToken;
            const qry: QParams = { limit: 10, page: 1, sort: 'orderBy' };

            jest.spyOn(noteService, 'notes').mockResolvedValue(mockNote);

            const result = await noteController.notes(user, qry);
            expect(result).toEqual(mockNote);
            expect(noteService.notes).toHaveBeenCalledWith(user, qry);
        });
    });

    describe('getById', () => {
        it('should return a note for a given id', async () => {
            const mockNote = { title: 'Sample Note', content: 'This is a sample note.' } as Note;
            const user = {
                email: 'user@example.com',
            } as unknown as DecodedIdToken;
            const id = 'sampleNoteId';

            jest.spyOn(noteService, 'getById').mockResolvedValue(mockNote);

            const result = await noteController.getById(user, id);
            expect(result).toEqual(mockNote);
            expect(noteService.getById).toHaveBeenCalledWith(user, id);
        });
    });
});
