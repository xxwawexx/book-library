import { FastifyInstance } from 'fastify';
import bookController from './book.controller';

export default async function bookRoutes(app: FastifyInstance) {
  const ctrl = bookController(app);

  app.get('/books', {
    schema: {
      summary: 'Get all books',
      tags: ['books'],
      response: {
        200: {
          description: 'List of books',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              authorId: { type: 'number' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              author: { 
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, ctrl.getAll);

  app.get('/books/:id', {
    schema: {
      summary: 'Get a book by ID',
      tags: ['books'],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      },
      response: {
        200: {
          description: 'A book',
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            authorId: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            author: { 
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' }
              }
            }
          }
        },
        404: {
          description: 'Not found',
          type: 'object',
          properties: { message: { type: 'string' } }
        }
      }
    }
  }, ctrl.getOne);

  app.post('/books', {
    schema: {
      summary: 'Create a book',
      tags: ['books'],
      body: {
        type: 'object',
        required: ['title', 'authorId'],
        properties: {
          title: { type: 'string' },
          authorId: { type: 'number' }
        }
      },
      response: {
        201: {
          description: 'Created book',
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            authorId: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            author: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' }
              }
            }
          }
        },
        400: {
          description: 'Validation error or invalid authorId',
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  field: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, ctrl.create);

  app.put('/books/:id', {
    schema: {
      summary: 'Update a book',
      tags: ['books'],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          authorId: { type: 'number' }
        }
      },
      response: {
        200: {
          description: 'Updated book',
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            authorId: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            author: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' }
              }
            }
          }
        },
        404: {
          description: 'Book not found',
          type: 'object',
          properties: { message: { type: 'string' } }
        }
      }
    }
  }, ctrl.update);

  app.delete('/books/:id', {
    schema: {
      summary: 'Delete a book',
      tags: ['books'],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      },
      response: {
        204: { description: 'No content' },
        404: {
          description: 'Book not found', 
          type: 'object',
          properties: { message: { type: 'string' } }
        }
      }
    }
  }, ctrl.remove);
}
