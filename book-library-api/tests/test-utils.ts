import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import buildServer from '../src/utils/buildServer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function makeTestServer(): Promise<FastifyInstance> {
  const app = buildServer();
  await app.ready();
  return app;
}

export async function resetDb() {
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
}

export { prisma };