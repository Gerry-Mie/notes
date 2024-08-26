import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DecodedIdToken } from '../auth/auth.types';
import { User } from './user.model';
import * as admin from 'firebase-admin';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';

@Injectable()
export class UserService {
    logger = new Logger(UserService.name);
    constructor(private userRepository: UserRepository) {}
    async profile(auth: DecodedIdToken) {
        const user = await this.userRepository.getByEmail(auth.email);
        if (!user) {
            const firebaseUser = await admin.auth().getUser(auth.uid);
            const newUser: User = {
                uid: auth.uid,
                name: firebaseUser.displayName,
                email: firebaseUser.email,
                photoUrl: firebaseUser.photoURL,
            };
            return await this.userRepository.register(newUser);
        }
        return user;
    }

    async updateUserPermission(data: UpdateUserPermissionDto) {
        const auth = admin.auth();
        const session = await this.userRepository.getSession();

        try {
            let user: User;
            await session.withTransaction(async () => {
                const { email, isAdmin } = data;
                const usr = await this.userRepository.updateUserByEmail(email, { isAdmin }, { session });
                if (!usr) throw new BadRequestException({ code: 'invalid-email' });
                await auth.setCustomUserClaims(usr.uid, { isAdmin });
                user = usr;
            });
            return user;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
