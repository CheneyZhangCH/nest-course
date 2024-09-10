import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegistryUserDto } from './dto/registry-user.dto';
import { DbService } from '../db/db.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async registry(registryUserDto: RegistryUserDto) {
    const users: User[] = await this.dbService.read();
    const foundUser = users.find(
      (item) => item.username === registryUserDto.username,
    );
    if (foundUser) {
      throw new BadRequestException('该用户已经注册');
    }

    const user = new User();
    user.username = registryUserDto.username;
    user.password = registryUserDto.password;
    users.push(user);
    await this.dbService.write(users);
    return users;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const foundUser = users.find(
      (item) => item.username === loginUserDto.username,
    );
    if (foundUser) {
      if (foundUser.password !== loginUserDto.password) {
        throw new BadRequestException('密码错误');
      }
      return '登录成功';
    }
    return '用户尚未注册';
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
