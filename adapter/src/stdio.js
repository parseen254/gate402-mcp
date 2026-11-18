import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Catalog adapter for registry scoring (Glama builds this file).
// Tool schemas mirror the hosted API exactly. Execution is NOT local:
// handlers point callers at the paid HTTPS endpoint, which catalogs
// never invoke during listing scans (they only call tools/list).
const HOSTED = 'https://gate402-x402.parseen.workers.dev/api/gate402';
const SKILL_URL = `${HOSTED}/skill.md`;

const server = new McpServer({ name: 'gate402-x402', version: '0.1.0' });

server.registerTool(
  'create_checkout',
  {
    title: 'Create x402 checkout',
    description:
      'Issue buyer-facing x402 payment terms for one merchant order: funds settle payer to merchant directly. Costs $0.01 USDC per checkout on the hosted endpoint. First 20 per caller per day are free.',
    inputSchema: {
      network: z.string().describe("'base', 'solana' or full CAIP-2 id."),
      merchantPayTo: z.string().describe('Merchant payout address on that network.'),
      amountUsd: z.union([z.string(), z.number()]).describe('Order total in USD (0.01 to 10000).'),
      memo: z.string().optional().describe('Order reference (max 120 chars).'),
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
  },
  async () => ({
    content: [
      {
        type: 'text',
        text: `This catalog adapter does not create checkouts. Call the hosted endpoint: POST ${HOSTED}/v1/checkout/create with x402 payment ($0.01 USDC on Base or Solana). Full instructions: ${SKILL_URL}`,
      },
    ],
  }),
);

server.registerTool(
  'verify_checkout',
  {
    title: 'Verify checkout payment',
    description:
      'Verify and settle the buyer payment for a checkout id on the hosted endpoint. Free: pass the buyer paymentSignature, get back paid with the settlement transaction or pending with the reason.',
    inputSchema: {
      checkoutId: z.string().describe('Checkout id from create_checkout.'),
      paymentSignature: z.string().describe('Base64 x402 PaymentPayload from the buyer.'),
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  async () => ({
    content: [
      {
        type: 'text',
        text: `This catalog adapter does not verify payments. Call the hosted endpoint: POST ${HOSTED}/v1/checkout/:id/verify with the buyer paymentSignature. Full instructions: ${SKILL_URL}`,
      },
    ],
  }),
);

await server.connect(new StdioServerTransport());
