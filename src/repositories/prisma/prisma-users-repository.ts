import { PrismaClient } from '@prisma/client';
import { UsersRepository, User } from '../users-repository';

const prisma = new PrismaClient();

export class PrismaUsersRepository implements UsersRepository {
  async save(user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }


  async create(user: User) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}