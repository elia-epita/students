import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('*');
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ method: RequestMethod.GET, path: 'students/*' });
    /**
     * /students !== /students/:id
     *
     */
    /**
     * if exclude is given a parameter (ex: students) it is the equivalent of saying "students/*"
     * consumer.apply(LoggingMiddleware).exclude('students') === consumer.apply(LoggingMiddleware).exclude().forRoutes('students/*');
     *
     *
     * else, this acts as if exclude() wasn't present
     * consumer.apply(LoggingMiddleware).exclude().forRoutes('students');
     */
    consumer.apply(LoggingMiddleware).exclude('students');
  }
}
