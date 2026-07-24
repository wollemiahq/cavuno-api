import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const specPath = fileURLToPath(new URL('../openapi.json', import.meta.url));
const spec = JSON.parse(await readFile(specPath, 'utf8'));
const paths = Object.keys(spec.paths ?? {});

if (!String(spec.openapi ?? '').startsWith('3.')) {
  throw new Error('openapi.json must be an OpenAPI 3 document');
}
if (paths.length === 0) {
  throw new Error('openapi.json must contain public paths');
}
if (
  paths.some(
    (path) => path.startsWith('/boards/') || path.startsWith('/oauth/'),
  )
) {
  throw new Error('openapi.json contains a non-operator route');
}
if (JSON.stringify(spec).includes('"x-internal"')) {
  throw new Error('openapi.json contains a private visibility marker');
}
for (const [path, item] of Object.entries(spec.paths ?? {})) {
  for (const method of [
    'get',
    'post',
    'put',
    'patch',
    'delete',
    'head',
    'options',
  ]) {
    const operation = item?.[method];
    if (operation && operation['x-audience'] !== 'operator') {
      throw new Error(
        `${method.toUpperCase()} ${path} is not explicitly classified for the operator audience`,
      );
    }
  }
}

function resolvePointer(pointer) {
  let value = spec;
  for (const segment of pointer
    .slice(2)
    .split('/')
    .map((part) => part.replace(/~1/g, '/').replace(/~0/g, '~'))) {
    value = value?.[segment];
  }
  return value;
}

function validateReferences(value) {
  if (Array.isArray(value)) {
    for (const item of value) validateReferences(item);
    return;
  }
  if (!value || typeof value !== 'object') return;
  if (
    typeof value.$ref === 'string' &&
    value.$ref.startsWith('#/') &&
    resolvePointer(value.$ref) === undefined
  ) {
    throw new Error(`Unresolved OpenAPI reference: ${value.$ref}`);
  }
  for (const child of Object.values(value)) validateReferences(child);
}

validateReferences(spec);
console.log(`Validated ${paths.length} public API paths`);
