import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DeleteBookDto } from './dto/delete-book.dto';
import { DbService } from '../db/db.service';
import { Book } from './entities/book.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookService {
  @Inject(DbService)
  dbService: DbService;

  async list() {
    const books: Book[] = await this.dbService.read();
    return books;
  }

  async detail(id: number) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((item) => item.id === id);
    if (!book) throw new BadRequestException('书籍不存在');
    return book;
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    const _book = books.find(
      (item) =>
        item.name === createBookDto.name &&
        item.author === createBookDto.author,
    );
    if (_book) {
      throw new BadRequestException('该书籍已存在');
    }

    const book = new Book();
    book.id = Math.round(Math.random() * 10000);
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.desc = createBookDto.desc;
    book.cover = createBookDto.cover;

    books.push(book);
    await this.dbService.write<Book>(books);
    return '添加成功';
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((item) => item.id === updateBookDto.id);
    if (book == null) {
      throw new BadRequestException('该书籍不存在');
    }

    // const book = new Book();
    // book.id = _book.id;
    book.name = updateBookDto.name;
    book.author = updateBookDto.author;
    book.desc = updateBookDto.desc;
    book.cover = updateBookDto.cover;

    await this.dbService.write<Book>(books);
    return '修改成功';
  }

  async delete(deleteBookDto: DeleteBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((item) => item.id === deleteBookDto.id);
    if (book == null) {
      throw new BadRequestException('该书籍不存在');
    }
    const _books = books.filter((item) => item.id !== deleteBookDto.id);
    await this.dbService.write<Book>(_books);
    return '删除成功';
  }
}
