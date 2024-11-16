import { UserModel } from '@prisma/client';

export class GenerateTokenDTO {
  userId: number;
  userModel: UserModel;
}
