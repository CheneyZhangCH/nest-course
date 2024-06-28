import { Controller, Get, ParseIntPipe, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { Bbb } from './bbb.decorator';
import { Ccc } from './ccc.decorator';
import { MyHeaderParams } from './my-header.params.decorator';
import { MyQueryParams } from './my-query.params.decorator';
import { Ddd } from './ddd.decorator';

@Ddd()
// @Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @SetMetadata('aaa', 'admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello2(): string {
    return this.appService.getHello();
  }

  @Bbb('hello2', 'admin')
  getHello3(): string {
    return this.appService.getHello();
  }

  @Get('hello4')
  getHello4(@Ccc() c): string {
    return c;
  }

  @Get('hello5')
  getHello5(@MyHeaderParams('Accept') accept1, @MyHeaderParams('Accept') accept2,) {
    console.log('accept1', accept1)
    console.log('accept2', accept2)
  }

  @Get('hello6')
  getHello6(@MyQueryParams('name') name, @MyQueryParams('age', new ParseIntPipe()) age,) {
    console.log('name', name)
    console.log('age', age)
  }
}
