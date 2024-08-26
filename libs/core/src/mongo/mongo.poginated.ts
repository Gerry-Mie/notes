import { PaginateResult } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Paginated<T> implements PaginateResult<T> {
    @ApiProperty()
    docs: T[];

    @ApiProperty()
    hasNextPage: boolean;

    @ApiProperty()
    hasPrevPage: boolean;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    offset: number;

    @ApiProperty()
    pagingCounter: number;

    @ApiProperty()
    totalDocs: number;

    @ApiProperty()
    totalPages: number;

    [customLabel: string]: T[] | number | boolean | null | undefined;
}
