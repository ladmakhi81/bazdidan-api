import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { GenerateTokenDTO } from '../../auth/dtos';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateToken(dto: GenerateTokenDTO) {
    await this.destroyTokens(dto.userId);
    const accessToken = this.jwtService.sign(dto, {
      secret: this._getSecretKey(),
      expiresIn: '24h',
    });
    const { refreshTokenCode } = await this.createRefreshToken(
      accessToken,
      dto.userId,
    );
    return { accessToken, refreshToken: refreshTokenCode };
  }

  async destroyTokens(userId: number) {
    return this.prismaService.refreshToken.deleteMany({ where: { userId } });
  }

  async verifyToken(token: string) {
    const secret = this._getSecretKey();
    const decodedToken = await this.jwtService.verify(token, { secret });
    return decodedToken;
  }

  private createRefreshToken(accessToken: string, userId: number) {
    const refreshTokenCode = this._generateRefreshToken();
    return this.prismaService.refreshToken.create({
      data: { accessToken, userId, refreshTokenCode },
    });
  }

  private _getSecretKey() {
    return this.configService.get('SECRET_KEY');
  }

  private _generateRefreshToken() {
    return randomBytes(16).toString('hex');
  }
}
