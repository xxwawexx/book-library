import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import AuthorService from './author.service';
import { createAuthorSchema } from './author.schema';

export default function authorController(app: FastifyInstance) {
  const svc = new AuthorService(app);

  return {
    getAll: async (_: FastifyRequest, reply: FastifyReply) => {
      return reply.send(await svc.all());
    },

    getOne: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const author = await svc.byId(Number(req.params.id));
      if (!author) return reply.code(404).send({ message: 'Author not found' });
      return reply.send(author);
    },

    create: async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
      const parsed = createAuthorSchema.safeParse(req.body);
      if (!parsed.success) return reply.code(400).send({ errors: parsed.error.errors });

      const author = await svc.create(parsed.data);
      return reply.code(201).send(author);
    },

    update: async (
      req: FastifyRequest<{ Params: { id: string }; Body: Partial<any> }>,
      reply: FastifyReply
    ) => {
      const author = await svc.update(Number(req.params.id), req.body);

      if (!author) return reply.code(404).send({ message: 'Author not found' });

      return reply.send(author);
    },

    remove: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const result = await svc.delete(Number(req.params.id));

      if (!result) return reply.code(404).send({ message: 'Author not found' });

      return reply.code(204).send();
    }
  };
}
