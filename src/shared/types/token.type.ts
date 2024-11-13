import { UserModel } from '@prisma/client';

export interface VerifiedToken {
  userId: number;
  userModel: UserModel;
}
