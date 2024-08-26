import { auth } from 'firebase-admin';

export type DecodedIdToken = auth.DecodedIdToken & {
    _id?: string;
};
