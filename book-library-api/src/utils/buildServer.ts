import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '../plugins/swagger';
import prisma from '../plugins/prisma';
import bookRoutes from '../modules/book/book.routes';
import authorRoutes from '../modules/author/author.routes';

export default function buildServer() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: [
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // plugins
  app.register(swagger);
  app.register(prisma);

  // routes
  app.register(bookRoutes);
  app.register(authorRoutes);

  return app;
}
