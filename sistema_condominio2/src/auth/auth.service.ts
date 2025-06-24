import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  create(createAuthDto: CreateAuthDto) {
    return this.prisma.usuario.create({
      data: createAuthDto,
    });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.prisma.usuario.update({
      where: { id },
      data: updateAuthDto,
    });
  }

  remove(id: number) {
      return this.prisma.usuario.delete({
      where: { id },
    });
  }

  login(email: string, password: string) {
    return this.prisma.usuario.findUnique({
      where: { email, password },
    });
  }

  register(email: string, password: string) {
    return this.prisma.usuario.create({
      data: { email, password },
    });
  }
}
