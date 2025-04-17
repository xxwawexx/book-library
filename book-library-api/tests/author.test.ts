import { test } from 'tap';
import { makeTestServer, resetDb, prisma } from './test-utils';

test('Author routes', async t => {
  await resetDb();
  const app = await makeTestServer();

  t.teardown(async () => {
    await app.close();
    await resetDb();
  });

  let authorId: number;

  t.test('POST /authors creates an author', async t => {
    const res = await app.inject({
      method: 'POST',
      url: '/authors',
      payload: { name: 'Test Author' }
    });
    t.equal(res.statusCode, 201);
    const author = res.json();
    t.ok(author.id);
    t.equal(author.name, 'Test Author');
    authorId = author.id;
  });

  t.test('GET /authors returns list with the created author', async t => {
    const res = await app.inject({ method: 'GET', url: '/authors' });
    t.equal(res.statusCode, 200);
    const authors = res.json();
    t.ok(Array.isArray(authors));
    t.ok(authors.some((a: any) => a.id === authorId));
  });

  t.test('GET /authors/:id returns the author', async t => {
    const res = await app.inject({ method: 'GET', url: `/authors/${authorId}` });
    t.equal(res.statusCode, 200);
    t.equal(res.json().id, authorId);
  });

  t.test('GET /authors/:id returns 404 for missing author', async t => {
    const res = await app.inject({ method: 'GET', url: `/authors/999999` });
    t.equal(res.statusCode, 404);
    t.same(res.json(), { message: 'Author not found' });
  });

  t.test('PUT /authors/:id updates the author', async t => {
    const res = await app.inject({
      method: 'PUT',
      url: `/authors/${authorId}`,
      payload: { name: 'Updated Author' }
    });
    t.equal(res.statusCode, 200);
    t.equal(res.json().name, 'Updated Author');
  });

  t.test('PUT /authors/:id returns 404 for missing author', async t => {
    const res = await app.inject({
      method: 'PUT',
      url: `/authors/999999`,
      payload: { name: 'Will Fail' }
    });
    t.equal(res.statusCode, 404);
    t.same(res.json(), { message: 'Author not found' });
  });

  t.test('DELETE /authors/:id deletes the author', async t => {
    await prisma.book.deleteMany({ where: { authorId } });
    const res = await app.inject({ method: 'DELETE', url: `/authors/${authorId}` });
    t.equal(res.statusCode, 204);
    
    const res2 = await app.inject({ method: 'GET', url: `/authors/${authorId}` });
    t.equal(res2.statusCode, 404);
  });

  t.test('DELETE /authors/:id returns 404 for missing author', async t => {
    const res = await app.inject({ method: 'DELETE', url: `/authors/999999` });
    t.equal(res.statusCode, 404);
    t.same(res.json(), { message: 'Author not found' });
  });
});
