# gate402 — drop-in x402 checkout

Issue payment terms through us, settle with your own wallet. Buyers pay
the merchant address directly in USDC on Base or Solana.

- Create: `POST https://gate402-x402.parseen.workers.dev/api/gate402/v1/checkout/create` ($0.01, 20 free/day)
- Status: `GET https://gate402-x402.parseen.workers.dev/api/gate402/v1/checkout/:id` (free)
- Verify: `POST https://gate402-x402.parseen.workers.dev/api/gate402/v1/checkout/:id/verify` (free)
- MCP: `https://gate402-x402.parseen.workers.dev/api/gate402/mcp`
- Demo: `https://gate402-x402.parseen.workers.dev/api/gate402/demo`
- OpenAPI: `https://gate402-x402.parseen.workers.dev/api/gate402/docs/openapi.json`
- Skill: [`SKILL.md`](SKILL.md)
