import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiResponseInterceptor } from './core/interceptors/api-response.interceptor';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiExceptionFilter } from './core/filters/api-exception.filter';

const initializeSwagger = (app: INestApplication, isProduction: boolean) => {
  if (isProduction) return;
  const swaggerDocumentOption = new DocumentBuilder()
    .setTitle('Bazdidan api')
    .setDescription('Bazdidan api implemented by NestJS')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      name: 'Authorization',
      bearerFormat: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerDocumentOption);
  SwaggerModule.setup('/document', app, document);
};

const configureApplication = (app: INestApplication) => {
  app.setGlobalPrefix('/api');
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, stopAtFirstError: true }),
  );
  app.useGlobalFilters(new ApiExceptionFilter());
  app.enableCors();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('APP_PORT'));
  const appEnvironment = configService.get('NODE_ENV');
  const isProduction = appEnvironment === 'production';

  configureApplication(app);
  initializeSwagger(app, isProduction);

  await app.listen(port, () => {
    console.log(`${new Date().toISOString()}: app is running at ${port}`);
  });
}
bootstrap();
