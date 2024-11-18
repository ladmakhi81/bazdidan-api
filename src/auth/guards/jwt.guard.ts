import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VerifiedToken } from 'src/shared/types/token.type';
import { Request } from 'express';
import { TokenService } from 'src/shared/token/token.service';
import { UserService } from 'src/user/user.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const tokenHeader = request.header('Authorization');
    if (!tokenHeader) {
      throw new UnauthorizedException(
        this.i18n.t('messages.errors.auth.login_message'),
      );
    }
    const [bearer, token] = tokenHeader?.split(' ');
    if (!bearer || bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        this.i18n.t('messages.errors.auth.token_expired'),
      );
    }
    const verifiedToken: VerifiedToken =
      await this.tokenService.verifyToken(token);
    if (!verifiedToken) {
      throw new UnauthorizedException(
        this.i18n.t('messages.errors.auth.token_expired'),
      );
    }
    request.user = await this.userService.getUserProfileById(
      verifiedToken.userId,
    );
    return true;
  }
}
