import { User } from './auth';

export type Author = Pick<User, 'id' | 'nickname' | 'profileImage'>;
