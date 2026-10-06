import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp, sanitizeCase, validateMessages } from './server.mjs';

test('sanitizeCase keeps only known string fields, max 600 chars', () => {
  const out = sanitizeCase({ model: 'KC', hack: 'x', year: 2024, symptoms: 'a'.repeat(1000) });
  assert.deepEqual(Object.keys(out).sort(), ['model', 'symptoms']);
  assert.equal(out.symptoms.length, 600);
  assert.deepEqual(sanitizeCase([]), {});
});

test('validateMessages accepts a simple user message and rejects bad input', () => {
  assert.equal(validateMessages([{ role: 'user', content: 'bonjour' }]).length, 1);
  assert.throws(() => validateMessages([]));
  assert.throws(() => validateMessages([{ role: 'assistant', content: 'x' }]));
  assert.throws(() => validateMessages([{ role: 'user', content: [{ type: 'image' }] }]));
});

test('health and chat status endpoints', async () => {
  const app = createApp({});
  await new Promise(r => app.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${app.address().port}`;
  try {
    assert.equal((await fetch(base + '/health')).status, 200);
    const s = await (await fetch(base + '/api/chat/status')).json();
    assert.equal(s.configured, false);
    assert.equal((await fetch(base + '/api/chat', { method: 'POST' })).status, 503);
    assert.equal((await fetch(base + '/nope')).status, 404);
  } finally { app.close(); }
});
