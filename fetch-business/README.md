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
| `/workbench/integrations/:slug` | Integration detail (Gmail, HubSpot, Calendly) |
| `/demo/asi1` | ASI:one consumer POC |

## Functionality

All data persists in **localStorage** across page reloads.

| Feature | What works |
|---------|------------|
| **Agents** | Create agents, search, switch active agent (header dropdown) |
| **Profile** | Edit and save name, handle, description, location, website |
| **Documents** | Upload files (simulated processing), delete, add plain text |
| **Orders** | Create orders, filter by status, search |
| **Claim** | Claim agents (progress → claimed), search brand agents |
| **Workflows** | Create/run/delete workflows; schedule/delete tasks; credits tracking |
| **Chats** | Start conversations, send messages (simulated agent replies) |
| **Integrations** | Toggle apps on/off (persisted); deep-dive pages for finalized apps |
| **Socials** | Generate platform-specific posts, copy to clipboard |
| **ASI:one demo** | Consumer-side chat simulating discovery, A2A, and integration activity |

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

## Reports

| Report | File |
|--------|------|
| Gmail, HubSpot & Calendly (why include) | `docs/Gmail-HubSpot-Calendly-Integrations-Report.docx` |
| Gmail / HubSpot / Calendly feasibility | `docs/Integrations-Feasibility-Report.md` · `docs/Integrations-Feasibility-Report.docx` |
| Presentation (PowerPoint) | `docs/Fetch-Business-Integrations-Presentation.pptx` |

Regenerate reports & deck:

```bash
npm run report:integrations
npm run report:feasibility
npm run presentation:pptx
```

## Stack

- React 19 + Vite
- React Router
- Tailwind CSS v4
- Lucide React icons
