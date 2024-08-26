import { Module } from '@nestjs/common';
import { MongoModule } from '@app/core/mongo';
import { User } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
    imports: [MongoModule.forFeatures([User])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserRepository],
})
export class UserModule {}
