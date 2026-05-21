# fetch business

A rebuild of the [fetch business](https://business.fetch.ai) dashboard UI, based on the original product screenshots.

## Pages

| Route | Page |
|-------|------|
| `/` | My Agents (Home) |
| `/claim` | Claim Your Business Agent |
| `/workbench/profile` | Profile & Instructions |
| `/workbench/business-info` | Business Information |
| `/workbench/workflows/library` | Socials Library |
| `/workbench/workflows` | Workflows & Tasks |
| `/workbench/chats` | Agent Messages |
| `/workbench/orders` | Orders |
| `/workbench/integrations` | Integrations |
| `/workbench/trust` | Trust & Governance (10 improvement frontiers) |

### Trust & Governance frontiers

1. **Fiduciary standards** — brand vs user duty of care
2. **Graduated financial authority** — purchase permission tiers
3. **Verifiable audit trails** — signed A2A negotiation logs
4. **Consent-aware data sharing** — retention and scope controls
5. **Adversarial agent detection** — anomaly monitoring & quarantine
6. **Conflict-of-interest disclosure** — affiliate/sponsorship metadata
7. **Cross-agent arbitration** — neutral dispute resolution
8. **Behavioral pinning** — versioned policy contracts
9. **Intent verification** — signed goals across multi-hop calls
10. **Interoperability** — MCP, A2A, and open protocol bridges

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Stack

- React 19 + Vite
- React Router
- Tailwind CSS v4
- Lucide React icons
