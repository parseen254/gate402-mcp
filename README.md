# gate402-mcp

Public adapter plus docs for the gate402 merchant-checkout x402 API for merchants and AI agents.

- Live API: `https://gate402-x402.parseen.workers.dev/api/gate402` ($0.01 per checkout, verify free)
- Demo storefront: `https://gate402-x402.parseen.workers.dev/api/gate402/demo`
- Agent skill: [`docs/SKILL.md`](docs/SKILL.md)

## Layout

- `adapter/` — public MCP stdio adapter (tool schemas only) for registry
  scoring. Execution happens on the hosted endpoint. No product logic here.
- `docs/` — explanation, skill, manifests.

Product source stays private. This repo carries schemas, skill and docs only.
