import { test } from 'node:test';
import assert from 'node:assert/strict';
import { signFormToken, verifyFormToken } from '../src/lib/form-token.ts';
import { isHoneypotFilled, isTooFast } from '../src/lib/anti-spam.ts';

const SECRET = 'test-secret-at-least-16-chars-long';

test('POST directo SIN token → rechazado', () => {
  assert.equal(verifyFormToken(undefined, Date.now(), undefined, SECRET), false);
  assert.equal(verifyFormToken('', Date.now(), undefined, SECRET), false);
  assert.equal(verifyFormToken('not-a-token', Date.now(), undefined, SECRET), false);
});

test('token con firma inválida (forjado) → rechazado', () => {
  const now = Date.now();
  const forged = `${now}.AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH`;
  assert.equal(verifyFormToken(forged, now, undefined, SECRET), false);
});

test('token firmado con OTRO secreto → rechazado', () => {
  const now = Date.now();
  const token = signFormToken(now, 'a-completely-different-secret-000');
  assert.equal(verifyFormToken(token, now, undefined, SECRET), false);
});

test('envío real desde la página (token válido y fresco) → pasa', () => {
  const now = Date.now();
  const token = signFormToken(now, SECRET);
  assert.equal(verifyFormToken(token, now, undefined, SECRET), true);
});

test('token expirado (más de maxAge) → rechazado', () => {
  const issued = Date.now();
  const token = signFormToken(issued, SECRET);
  const later = issued + 7 * 60 * 60 * 1000; // 7h > 6h maxAge
  assert.equal(verifyFormToken(token, later, 6 * 60 * 60 * 1000, SECRET), false);
});

test('token del futuro (más allá del skew tolerado) → rechazado', () => {
  const future = Date.now() + 60 * 60 * 1000; // 1h en el futuro
  const token = signFormToken(future, SECRET);
  assert.equal(verifyFormToken(token, Date.now(), undefined, SECRET), false);
});

test('capa honeypot: honeypot lleno → detectado', () => {
  assert.equal(isHoneypotFilled({ website: 'http://spam' }), true);
  assert.equal(isHoneypotFilled({ company_url: 'x' }), true);
  assert.equal(isHoneypotFilled({ nombre: 'Camilo' }), false);
});

test('capa tiempo: envío <3s → detectado', () => {
  assert.equal(isTooFast({ form_elapsed: '1200' }), true);
  assert.equal(isTooFast({ form_elapsed: '5000' }), false);
  // Ausente NO bloquea (fail-open de esa capa; el token es la defensa dura).
  assert.equal(isTooFast({}), false);
});
