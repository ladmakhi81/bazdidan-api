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

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const tokenHeader = request.header('Authorization');
    if (!tokenHeader) {
      throw new UnauthorizedException('ابتدا وارد حساب کاربری خود شوید');
    }
    const [bearer, token] = tokenHeader?.split(' ');
    if (!bearer || bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('توکن کاربر نامعتبر میباشد');
    }
    const verifiedToken: VerifiedToken =
      await this.tokenService.verifyToken(token);
    if (!verifiedToken) {
      throw new UnauthorizedException('توکن کاربر نامعتبر میباشد');
    }
    request.user = await this.userService.getUserProfileById(
      verifiedToken.userId,
    );
    return true;
  }
}
