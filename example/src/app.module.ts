import { Module } from '@nestjs/common';
import { AppCommand } from './app.command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CliModule } from '@pubfunc/nestjs-cli';
@Module({
  imports: [CliModule],
  controllers: [AppController],
  providers: [AppService, AppCommand],
})
export class AppModule {}
