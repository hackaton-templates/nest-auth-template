import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: configService.get('CORS_ORIGIN')?.split(',') || undefined,
  });

  const config = new DocumentBuilder()
    .addBearerAuth({ type: 'http' }, 'Access Token')
    .addBearerAuth({ type: 'http' }, 'Refresh Token')
    .setTitle('nest-auth-template')
    .setDescription('Шаблон NestJS приложения со встроенной авторизацией')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
