import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

export const Authentication = () => {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtGuard),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
    }),
  );
};
