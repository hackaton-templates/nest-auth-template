import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async find(id: number) {
    const user = await this.prismaService.user
      .findFirstOrThrow({
        where: { id },
      })
      .catch((err) => {
        if (err.code == 'P2025') throw new NotFoundException();
        throw err;
      });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user
      .findFirstOrThrow({
        where: { email },
      })
      .catch((err) => {
        if (err.code == 'P2025') throw new NotFoundException();
        throw err;
      });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 10);
    return await this.prismaService.user
      .create({
        data: {
          ...createUserDto,
          password,
        },
      })
      .catch((e) => {
        if (e.code == 'P2002') {
          throw new ConflictException('Email must be unique');
        }
        throw e;
      });
  }
}
