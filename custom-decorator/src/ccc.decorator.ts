import { createParamDecorator, SetMetadata } from '@nestjs/common';

export const Ccc = createParamDecorator((data, input) => {
  console.log('createParamDecorator data ', data);
  console.log('createParamDecorator input ', input);

  return 'ccc';
});

