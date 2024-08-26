import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@app/core/config';
import { MongoModule } from '@app/core/mongo';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';

@Module({
    imports: [AuthModule, ConfigModule, UserModule, MongoModule, NoteModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
