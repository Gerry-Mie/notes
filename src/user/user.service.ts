import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DecodedIdToken } from '../auth/auth.types';
import { User } from './user.model';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}
    async profile(auth: DecodedIdToken) {
        const user = await this.userRepository.getByEmail(auth.email);
        if (!user) {
            const firebaseUser = await admin.auth().getUser(auth.uid);
            const newUser: User = {
                name: firebaseUser.displayName,
                email: firebaseUser.email,
                photoUrl: firebaseUser.photoURL,
            };
            return await this.userRepository.register(newUser);
        }
        return user;
    }
}
