import { ApiPropertyOptional } from '@nestjs/swagger';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class QParams {
    // private query: Partial<typeof this> = {};

    static Query = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return new this(request.query);
    });

    constructor(q: Record<string, string> = {}) {
        this.limit = parseInt(q?.limit) || 10;
        this.page = parseInt(q?.page) || 1;
        this.sort = q?.orderBy;
    }

    @ApiPropertyOptional()
    limit?: number;

    @ApiPropertyOptional()
    page?: number;

    @ApiPropertyOptional()
    sort?: string;
}
