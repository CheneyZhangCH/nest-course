import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DeleteBookDto } from './dto/delete-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('list')
  list() {
    return this.bookService.list();
  }

  @Get('detail/:id')
  detail(@Param('id') id: string) {
    console.log(id);
    return this.bookService.detail(+id);
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Post('update')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Post('delete')
  delete(@Body() deleteBookDto: DeleteBookDto) {
    return this.bookService.delete(deleteBookDto);
  }
}
