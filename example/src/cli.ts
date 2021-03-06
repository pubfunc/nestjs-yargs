import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { REQUEST_CONTEXT_ID } from '@nestjs/core/router/request/request-constants';
import { AppModule } from './app.module';
import { YargsService } from '@pubfunc/nestjs-yargs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {});

  const contextId = ContextIdFactory.create();

  app.registerRequestByContextId(
    { cli: true, [REQUEST_CONTEXT_ID]: contextId },
    contextId,
  );

  const cli = await app.resolve(YargsService, contextId, { strict: false });

  try {
    await cli.exec();

    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
