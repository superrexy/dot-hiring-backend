import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseWrapperInterceptor } from './common/interceptors/response-wrapper.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API Prefix
  app.setGlobalPrefix('api', {
    exclude: ['api-docs', '/'],
  });

  // Enable CORS
  app.enableCors({ origin: '*' });

  // Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('DOT Hiring API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Global Interceptors
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());

  await app.listen(process.env.PORT || 3000);
  Logger.log(
    `Server running on http://localhost:${process.env.PORT || 3000}`,
    'Bootstrap',
  );
}

bootstrap();
