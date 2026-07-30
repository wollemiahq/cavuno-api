import { validatePublicOpenApi } from './validate-lib.mjs';

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const spec = JSON.parse(
  await readFile(new URL('../openapi.json', import.meta.url), 'utf8'),
);

test('the public contract defines every named security scheme', () => {
  assert.ok(spec.components?.securitySchemes?.bearerAuth);
  assert.doesNotThrow(() => validatePublicOpenApi(spec));
});

test('validation rejects a named security scheme without a definition', () => {
  const invalid = structuredClone(spec);
  delete invalid.components.securitySchemes.bearerAuth;

  assert.throws(
    () => validatePublicOpenApi(invalid),
    /Undefined OpenAPI security scheme: bearerAuth/,
  );
});
