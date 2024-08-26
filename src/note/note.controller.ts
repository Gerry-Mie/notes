import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QParams } from '@app/core/utils';
import { NoteService } from './note.service';
import { RequestUser } from '../auth/auth.decorators';
import { DecodedIdToken } from '../auth/auth.types';
import { CreateNoteDto } from './dto/create-note.dto';
import { MongoIdParam } from '@app/core/mongo';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteResponse, PaginatedNoteResponse } from './dto/note.response';

@ApiBearerAuth()
@ApiTags('notes')
@Controller('notes')
export class NoteController {
    constructor(private noteService: NoteService) {}

    @Get()
    @ApiQuery({ type: QParams })
    @ApiOperation({ summary: 'user notes' })
    @ApiResponse({ type: PaginatedNoteResponse })
    notes(@RequestUser() user: DecodedIdToken, @QParams.Query() qry: QParams) {
        return this.noteService.notes(user, qry);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Note By Id' })
    @ApiResponse({ type: NoteResponse })
    getById(@RequestUser() user: DecodedIdToken, @MongoIdParam('id') id: string) {
        return this.noteService.getById(user, id);
    }

    @Post()
    @ApiOperation({ summary: 'Create Note' })
    @ApiResponse({ type: NoteResponse })
    create(@Body() body: CreateNoteDto, @RequestUser() user: DecodedIdToken) {
        return this.noteService.create(user, body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update Note By Id' })
    @ApiResponse({ type: NoteResponse })
    updateById(@Body() body: UpdateNoteDto, @RequestUser() user: DecodedIdToken, @MongoIdParam('id') id: string) {
        return this.noteService.updateById(user, id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Note By Id' })
    @ApiResponse({ type: NoteResponse })
    deleteById(@RequestUser() user: DecodedIdToken, @MongoIdParam('id') id: string) {
        return this.noteService.deleteById(user, id);
    }
}
