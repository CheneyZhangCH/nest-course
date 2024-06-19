import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('执行了getHello方法')
    return 'Hello World!';
  }

  getHello1(): string {
    console.log('执行了getHello1方法')
    return 'Hello World!1';
  }

  getHello2(): string {
    console.log('执行了getHello2方法')
    return 'Hello World!2';
  }
}
