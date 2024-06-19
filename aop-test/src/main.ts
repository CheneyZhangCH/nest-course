import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('global before', req.url)
    next()
    console.log('global after')

  })
  // app.useGlobalGuards(new LoginGuard())
  // app.useGlobalInterceptors(new TimeInterceptor())
  await app.listen(3000);
}
bootstrap();
