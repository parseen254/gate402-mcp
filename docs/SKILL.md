---
name: gate402-checkout
description: "Drop-in x402 checkout for merchants and AI agents. Issue buyer-facing USDC payment terms on Base and Solana ($0.01 per checkout, 20 free/day), buyers pay the merchant wallet directly, verify on demand (free). Includes demo storefront and sandbox transcript."
version: 0.1.0
price: "$0.01 per checkout creation, USDC"
payment: x402 v2
endpoint: https://gate402-x402.parseen.workers.dev/api/gate402
schema: https://gate402-x402.parseen.workers.dev/api/gate402/docs/openapi.json
mcp: https://gate402-x402.parseen.workers.dev/api/gate402/mcp
demo: https://gate402-x402.parseen.workers.dev/api/gate402/demo
---

# gate402 — drop-in x402 checkout

Issue payment terms through us, settle with your own wallet. Buyers pay
the merchant address directly in USDC (Base or Solana). gate402 never
touches buyer funds.

## Endpoints

- `POST /v1/checkout/create` — `{network, merchantPayTo, amountUsd,
  memo?}`. Returns `checkoutId`, buyer `terms`, `checkoutUrl`, `status`.
  $0.01 USDC. 20 free/day per `x-client-id`.
- `GET /v1/checkout/:id` — stored checkout state. Free.
- `POST /v1/checkout/:id/verify` — `{paymentSignature}` (base64 x402
  PaymentPayload from the buyer). Verifies against the stored terms and
  settles to the merchant. Returns `paid` with `transaction` or
  `pending` with `reason`. Free; paid verdicts cache.
- `POST /mcp` — MCP server: `create_checkout`, `verify_checkout`.
- `GET /demo` — demo storefront driving the live flow.
- `GET /v1/sandbox/simulate` — canned transcript for integrators.

## Merchant integration

1. Create a checkout (pay $0.01 or use the free tier).
2. Show the buyer `terms` (any x402 v2 client can pay them).
3. Buyer signs; their wallet pays `terms.payTo` (your address).
4. Call verify with the buyer's `paymentSignature`; on `paid`, fulfill.

gate402's fee covers terms issuance only. Unknown checkout ids are never
charged for: verify on an unknown id returns 404 without settlement.
