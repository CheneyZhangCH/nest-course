import { IsNotEmpty } from 'class-validator';

export class DeleteBookDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
}
