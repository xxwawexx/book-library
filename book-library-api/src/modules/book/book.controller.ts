import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import BookService from './book.service';
import { createBookSchema, updateBookSchema } from './book.schema';

export default function bookController(app: FastifyInstance) {
  const svc = new BookService(app);

  return {
    getAll: async (_: FastifyRequest, reply: FastifyReply) => {
      return reply.send(await svc.all());
    },

    getOne: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const book = await svc.byId(Number(req.params.id));
      if (!book) return reply.code(404).send({ message: 'Book not found' });
      return reply.send(book);
    },

    create: async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
      const parsed = createBookSchema.safeParse(req.body);
      if (!parsed.success) return reply.code(400).send({ errors: parsed.error.errors });
      
      const book = await svc.create(parsed.data);

      if (book && 'error' in book) {
        return reply.code(400).send({ 
          errors: [{ message: book.error.message, field: book.error.field }]
        });
      }

      return reply.code(201).send(book);
    },

    update: async (
      req: FastifyRequest<{ Params: { id: string }; Body: any }>,
      reply: FastifyReply
    ) => {
      const parsed = updateBookSchema.safeParse(req.body);
      if (!parsed.success) return reply.code(400).send({ errors: parsed.error.errors });
      
      const book = await svc.update(Number(req.params.id), parsed.data);
      if (!book) return reply.code(404).send({ message: 'Book not found' });
      
      return reply.send(book);
    },

    remove: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await svc.delete(Number(req.params.id));
      if (!result) return reply.code(404).send({ message: 'Book not found' });
      return reply.code(204).send();
    }
  };
}