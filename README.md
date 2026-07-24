# Cavuno API

The machine-readable OpenAPI contract for the public Cavuno REST API.

Cavuno lets operators and AI agents create and run job boards: manage jobs,
companies, memberships, applications, billing, reporting, and other
operator-visible resources through the same product-level capabilities
available in the Cavuno UI.

- API base: `https://api.cavuno.com/v1`
- Documentation: https://cavuno.com/docs/api
- OpenAPI: [`openapi.json`](./openapi.json)
- Authentication: Cavuno API key or OAuth bearer token

This repository contains the public interface contract, examples, and issue
tracker. It does not contain Cavuno's service implementation, private routes,
credentials, infrastructure configuration, or customer data.

The OpenAPI document is generated from Cavuno's public API allowlist. Do not
hand-edit it; propose contract changes through an issue.

## License

The repository content is available under the MIT License. Cavuno names and
logos remain subject to [`TRADEMARKS.md`](./TRADEMARKS.md).
