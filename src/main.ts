import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      /**
       * auto transform payload DTO instances
       * because when we receive requests with payloads, these payloads
       * come over the network as plain JS objects. This is done by design
       *
       * check the instance of createStudentDto
       */
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  // Setting up Swagger document
  const options = new DocumentBuilder()
    .setTitle('Students')
    .setDescription('Students application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // SwaggerModule.setup('api', app, document);

  app.use(
    '/api',
    apiReference({
      content: document,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
