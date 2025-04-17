import { test } from 'tap';
import { makeTestServer, resetDb, prisma } from './test-utils';

test('Book routes', async t => {
  await resetDb();
  const app = await makeTestServer();
  
  const author = await prisma.author.create({ data: { name: 'BookAuthor' } });

  t.teardown(async () => {
    await app.close();
    await resetDb();
  });

  let bookId: number;

  t.test('POST /books creates a book', async t => {
    const res = await app.inject({
      method: 'POST',
      url: '/books',
      payload: { title: 'Test Book', authorId: author.id }
    });
    t.equal(res.statusCode, 201);
    const book = res.json();
    t.equal(book.title, 'Test Book');
    t.equal(book.authorId, author.id);
    t.ok(book.id);
    bookId = book.id;
  });

  t.test('GET /books returns book list', async t => {
    const res = await app.inject({ method: 'GET', url: '/books' });
    t.equal(res.statusCode, 200);
    const books = res.json();
    t.ok(Array.isArray(books));
    t.ok(books.some((b: any) => b.id === bookId));
  });

  t.test('GET /books/:id returns the book', async t => {
    const res = await app.inject({ method: 'GET', url: `/books/${bookId}` });
    t.equal(res.statusCode, 200);
    t.equal(res.json().id, bookId);
  });

  t.test('GET /books/:id returns 404 on missing book', async t => {
    const res = await app.inject({ method: 'GET', url: `/books/999999` });
    t.equal(res.statusCode, 404);
    t.same(res.json(), { message: 'Book not found' });
  });

  t.test('PUT /books/:id updates the book', async t => {
    const res = await app.inject({
      method: 'PUT',
      url: `/books/${bookId}`,
      payload: { title: 'Updated Book' }
    });
    t.equal(res.statusCode, 200);
    t.equal(res.json().title, 'Updated Book');
  });

  t.test('PUT /books/:id returns 404 on bad id', async t => {
    const res = await app.inject({
      method: 'PUT',
      url: `/books/999999`,
      payload: { title: 'Will Fail' }
    });
    t.equal(res.statusCode, 404);
    t.same(res.json(), { message: 'Book not found' });
  });

  t.test('DELETE /books/:id deletes the book', async t => {
    const res = await app.inject({ method: 'DELETE', url: `/books/${bookId}` });
    t.equal(res.statusCode, 204);
    
    const res2 = await app.inject({ method: 'GET', url: `/books/${bookId}` });
    t.equal(res2.statusCode, 404);
  });

  t.test('DELETE /books/:id returns 404 for missing book', async t => {
    const res = await app.inject({ method: 'DELETE', url: `/books/999999` });
    t.equal(res.statusCode, 404);
    t.same(res.json(), { message: 'Book not found' });
  });
});
