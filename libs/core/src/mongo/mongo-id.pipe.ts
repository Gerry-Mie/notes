import { isValidObjectId } from 'mongoose';
import { BadRequestException, Injectable, Param, PipeTransform } from '@nestjs/common';

@Injectable()
export class MongoIdPipe implements PipeTransform {
    transform(value: string) {
        if (!isValidObjectId(value)) {
            throw new BadRequestException({ code: 'invalid-param', message: `"${value}" is not a valid ID` });
        }
        return value;
    }
}

export const MongoIdParam = (key: string) => Param(key, new MongoIdPipe());
