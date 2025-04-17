import { FastifyInstance } from 'fastify';
import { CreateAuthorInput } from './author.schema';
import { Prisma } from '@prisma/client';

export default class AuthorService {
  constructor(private app: FastifyInstance) {}

  all() {
    return this.app.prisma.author.findMany({ include: { books: true } });
  }

  byId(id: number) {
    return this.app.prisma.author.findUnique({ where: { id }, include: { books: true } });
  }

  create(data: CreateAuthorInput) {
    return this.app.prisma.author.create({ data });
  }

  async update(id: number, data: Partial<CreateAuthorInput>) {
    try {
      return await this.app.prisma.author.update({
        where: { id },
        data,
        include: { books: true }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        return null;
      }
      throw e;
    }
  }

  async delete(id: number) {
    try {
      return await this.app.prisma.author.delete({
        where: { id }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        return null;
      }
      throw e;
    }
  }
}
