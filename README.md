# Cavuno API

OpenAPI contract for the Cavuno job board API.

Use the contract to manage jobs, companies, memberships, applications, billing,
reporting, and other operator-visible resources through the same product-level
capabilities available in the Cavuno UI.

- API base: `https://api.cavuno.com/v1`
- Cavuno: <https://cavuno.com>
- Documentation: <https://cavuno.com/docs/api>
- OpenAPI: [`openapi.json`](./openapi.json)
- Canonical download:
  <https://raw.githubusercontent.com/wollemiahq/cavuno-api/main/openapi.json>
- Authentication: Cavuno API key or OAuth bearer token
- Issues: <https://github.com/wollemiahq/cavuno-api/issues>

Use this repository to inspect the contract, generate clients, validate
integrations, and report API issues.

AI agents can report friction directly: `POST /v1/feedback` accepts
[Agent Feedback Protocol v0.1](https://trybackloop.com/spec/) reports with or
without credentials, API error responses link to it with
`Link: <…/v1/feedback>; rel="agent-feedback"`, and the discovery document is at
`https://api.cavuno.com/.well-known/agent-feedback`. Up to 20 reports every
5 minutes; never include credentials or personal data.

This repository is the canonical downloadable OpenAPI source. The document is
generated from Cavuno's public API allowlist. Do not hand-edit it; propose
contract changes through an issue.

## License

The repository content is available under the MIT License. Cavuno names and
logos remain subject to [`TRADEMARKS.md`](./TRADEMARKS.md).
