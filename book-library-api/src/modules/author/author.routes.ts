import { FastifyInstance } from 'fastify';
import authorController from './author.controller';

export default async function authorRoutes(app: FastifyInstance) {
  const ctrl = authorController(app);

  app.get('/authors', {
    schema: {
      summary: 'Get all authors',
      tags: ['authors'],
      response: {
        200: {
          description: 'List of authors',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              books: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    authorId: { type: 'number' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, ctrl.getAll);

  app.get('/authors/:id', {
    schema: {
      summary: 'Get one author by ID',
      tags: ['authors'],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      },
      response: {
        200: {
          description: 'The author',
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            books: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  title: { type: 'string' },
                  authorId: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        404: {
          description: 'Author not found',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, ctrl.getOne);

  app.post('/authors', {
    schema: {
      summary: 'Create author',
      tags: ['authors'],
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' }
        }
      },
      response: {
        201: {
          description: 'The created author',
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            books: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  title: { type: 'string' },
                  authorId: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          type: 'object',
          properties: {
            errors: { type: 'array', items: { type: 'object' } }
          }
        }
      }
    }
  }, ctrl.create);

  app.put('/authors/:id', {
    schema: {
      summary: 'Update an author',
      tags: ['authors'],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'The updated author',
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            books: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  title: { type: 'string' },
                  authorId: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        404: {
          description: 'Author not found',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, ctrl.update);

  app.delete('/authors/:id', {
    schema: {
      summary: 'Delete an author',
      tags: ['authors'],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      },
      response: {
        204: { description: 'No content' },
        404: {
          description: 'Author not found',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, ctrl.remove);
}
