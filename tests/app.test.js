const { after, test } = require('node:test');
const assert = require('node:assert/strict');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-with-at-least-32-characters';

const app = require('../src/app');
const server = app.listen(0);

after(() => new Promise((resolve, reject) => {
  server.close((error) => error ? reject(error) : resolve());
}));

async function request(path) {
  const { port } = server.address();
  return fetch(`http://127.0.0.1:${port}${path}`);
}

test('GET /api/health returns the API status', async () => {
  const response = await request('/api/health');
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    success: true,
    data: { status: 'ok' }
  });
});

test('unknown routes return 404', async () => {
  const response = await request('/api/does-not-exist');
  assert.equal(response.status, 404);
  assert.equal((await response.json()).success, false);
});
