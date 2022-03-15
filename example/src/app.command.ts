import { Injectable, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { Command } from './decorators/command.decorator';
import { Option } from './decorators/option.decorator';
import { Positional } from './decorators/positional.decorator';

@Injectable({ scope: Scope.REQUEST })
export class AppCommand {
  constructor(private readonly service: AppService) {}

  @Command('debug <arg1> [arg2]', { description: 'Debug command' })
  async debug(
    @Positional('arg1', {
      type: 'string',
    })
    argument1: string,
    @Positional('arg2', {
      type: 'boolean',
      default: true,
    })
    argument2: boolean,
    @Option('log', {
      alias: 'l',
      type: 'number',
      default: 500,
      requiresArg: true,
    })
    delay: number,
  ) {
    console.log('executing async debug', argument1, argument2, delay);

    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });

    console.log('completed async debug');
  }
}
