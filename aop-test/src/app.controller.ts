import { Controller, Get, Query, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  // @UseGuards(LoginGuard)
  getHello1(): string {
    return this.appService.getHello1();
  }

  @Get('bbb')
  getHello2(): string {
    return this.appService.getHello2();
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  getHello3(@Query('num', ValidatePipe) num: number): number {
    return num + 1
  }
}
