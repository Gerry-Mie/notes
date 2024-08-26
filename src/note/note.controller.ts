import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QParams } from '@app/core/utils';
import { NoteService } from './note.service';
import { RequestUser } from '../auth/auth.decorators';
import { DecodedIdToken } from '../auth/auth.types';
import { CreateNoteDto } from './dto/create-note.dto';
import { MongoIdParam } from '@app/core/mongo';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiBearerAuth()
@ApiTags('note')
@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService) {}

    @Get()
    @ApiQuery({ type: QParams })
    @ApiOperation({ summary: 'user notes' })
    notes(@RequestUser() user: DecodedIdToken, @QParams.Query() qry: QParams) {
        return this.noteService.notes(user, qry);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Note By Id' })
    getById(@RequestUser() user: DecodedIdToken, @MongoIdParam('id') id: string) {
        return this.noteService.getById(user, id);
    }

    @Post()
    @ApiOperation({ summary: 'Create Note' })
    create(@Body() body: CreateNoteDto, @RequestUser() user: DecodedIdToken) {
        return this.noteService.create(user, body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update Note By Id' })
    updateById(@Body() body: UpdateNoteDto, @RequestUser() user: DecodedIdToken, @MongoIdParam('id') id: string) {
        return this.noteService.updateById(user, id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Note By Id' })
    deleteById(@RequestUser() user: DecodedIdToken, @MongoIdParam('id') id: string) {
        return this.noteService.deleteById(user, id);
    }
}
