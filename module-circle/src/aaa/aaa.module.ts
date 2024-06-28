import { Module, forwardRef } from '@nestjs/common';
import { BbbModule } from 'src/bbb/bbb.module';

@Module({
    imports: [
        forwardRef(() => BbbModule),
    ],
})
export class AaaModule {}
