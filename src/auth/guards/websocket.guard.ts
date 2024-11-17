import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { TokenService } from 'src/shared/token/token.service';
import { VerifiedToken } from 'src/shared/types/token.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WebsocketGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient() as Socket;
    const token = client.handshake?.auth?.token ?? '';

    if (!token) {
      throw new UnauthorizedException('ابتدا وارد حساب کاربری خود شوید');
    }

    const verifiedToken: VerifiedToken =
      await this.tokenService.verifyToken(token);

    if (!verifiedToken) {
      throw new UnauthorizedException('توکن کاربر نامعتبر میباشد');
    }
    client.authUser = await this.userService.getUserProfileById(
      verifiedToken.userId,
    );
    return true;
  }
}
