import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config, options } from './common/swagger.config';

const logger: Logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, options);

  await app.listen(+process.env.PORT || 3000);
  logger.log(`Worker ${process.pid} started on address ${await app.getUrl()}`);
}
bootstrap();
