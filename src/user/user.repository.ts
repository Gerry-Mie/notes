import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: PaginateModel<UserDocument>) {}

    getByEmail(email: string) {
        return this.userModel.findOne<UserDocument>({ email }).lean<UserDocument>(true);
    }

    async register(user: User) {
        const doc = await this.userModel.create(user);
        return doc.toJSON() as User;
    }
}
