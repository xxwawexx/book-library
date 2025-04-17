import { FastifyInstance } from 'fastify';
import { CreateBookInput, UpdateBookInput } from './book.schema';
import { Prisma } from '@prisma/client';

export default class BookService {
  constructor(private app: FastifyInstance) {}

  all() {
    return this.app.prisma.book.findMany({ include: { author: true } });
  }

  byId(id: number) {
    return this.app.prisma.book.findUnique({ where: { id }, include: { author: true } });
  }

  async create(data: CreateBookInput) {
    if (!(await this.authorExists(data.authorId))) {
      return { error: { message: 'Author does not exist', field: 'authorId' } };
    }
    
    return this.app.prisma.book.create({
      data,
      include: { author: true },
    });
  }
  
  async update(id: number, data: UpdateBookInput) {
    try {
      return await this.app.prisma.book.update({
        where: { id },
        data,
        include: { author: true }
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
      return await this.app.prisma.book.delete({
        where: { id }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        return null;
      }
      throw e;
    }
  }

  private async authorExists(authorId: number): Promise<boolean> {
    const count = await this.app.prisma.author.count({ where: { id: authorId } });
    return count > 0;
  }
}