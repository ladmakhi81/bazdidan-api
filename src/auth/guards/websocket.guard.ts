import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Socket } from 'socket.io';
import { TokenService } from 'src/shared/token/token.service';
import { VerifiedToken } from 'src/shared/types/token.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WebsocketGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient() as Socket;
    const token = client.handshake?.auth?.token ?? '';

    if (!token) {
      throw new UnauthorizedException(
        this.i18n.t('messages.errors.auth.login_message'),
      );
    }

    const verifiedToken: VerifiedToken =
      await this.tokenService.verifyToken(token);

    if (!verifiedToken) {
      throw new UnauthorizedException(
        this.i18n.t('messages.errors.auth.token_expired'),
      );
    }
    client.authUser = await this.userService.getUserProfileById(
      verifiedToken.userId,
    );
    return true;
  }
}
