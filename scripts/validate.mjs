import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { validatePublicOpenApi } from './validate-lib.mjs';

const specPath = fileURLToPath(new URL('../openapi.json', import.meta.url));
const spec = JSON.parse(await readFile(specPath, 'utf8'));
const result = validatePublicOpenApi(spec);
console.log(`Validated ${result.paths} public API paths`);
