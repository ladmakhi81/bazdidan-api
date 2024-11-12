import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';

export const Authentication = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtGuard));
};
