# Gmail, HubSpot & Calendly — Feasibility Report

**Date:** May 21, 2026  
**Scope:** The three finalized Fetch Business integrations only.  
**Question:** Can Fetch build these for free, or do they require paid APIs, owner subscriptions, platform compliance cost, or formal partnerships?

---

## Executive summary

| Integration | Free to build (API)? | Owner must pay? | Partnership required? | Main production friction |
|-------------|----------------------|-----------------|----------------------|---------------------------|
| **Gmail** | Yes | Gmail / Google Workspace (often already have) | No | **High** — Google OAuth restricted scopes; possible security assessment |
| **HubSpot** | Yes | Free CRM possible; scale → paid HubSpot | No (marketplace optional) | **Low–medium** — API rate limits per connected portal |
| **Calendly** | Yes (developer portal) | **Yes** — paid plan for Scheduling API | No | **Low** — confirm owner plan supports Scheduling API |

**Bottom line**

- **None of the three are “free end-to-end.”** APIs are generally free to integrate; owners pay SaaS where required; Fetch pays engineering and (for Gmail) compliance.
- **No formal vendor partnerships are required** for an MVP where each business connects its own account (bring-your-own-account, BYOA).
- **Calendly auto-booking** must not be promised on a free Calendly plan.
- **Gmail at production scale** is the hardest: Google OAuth verification for restricted mail scopes, not API license fees.

---

## How to read this report

For each integration:

1. **Can Fetch ship it technically?** (API / MCP / OAuth available)
2. **Does Fetch pay the vendor?** (platform fees, assessments)
3. **Does the business owner pay?** (subscription, usage)
4. **Is a partnership required?** (ISV, marketplace, co-sell)

---

## Gmail

### API access

- **Free to build.** [Gmail API](https://developers.google.com/gmail/api) and Google Calendar API are on Google Cloud; no per-request license fee for standard use.
- **Gmail MCP** is a separate developer-preview track for agent tooling.

### Owner cost

- **Low.** Works with consumer Gmail or Google Workspace. Many SMBs already have a mailbox; Workspace is a per-seat product they may already pay for.

### Fetch platform cost

- **High for production at scale.** Scopes such as `gmail.readonly`, `gmail.compose`, and `gmail.modify` are **restricted**. Apps beyond test users need [Google OAuth verification](https://support.google.com/cloud/answer/13464321):
  - Brand verification (~2–3 business days)
  - Restricted scope verification (often ~6 weeks)
  - Possible **third-party security assessment** if restricted-scope data is stored or processed on Fetch servers (industry ballpark often cited in tens of thousands USD — confirm with a Google-approved assessor)

### Partnership

- **Not required** for direct API integration.
- Optional later: Google Workspace Marketplace listing (distribution, not API access).

### Feasibility verdict

| Stage | Verdict |
|-------|---------|
| **MVP / internal** | **Yes** — test users, internal use, or narrow pilot without full production verification |
| **Production (many businesses)** | **Yes, with compliance budget** — plan legal/privacy, verification timeline, and possible assessment cost |

### Recommendations

- Start with **read + draft only** (`gmail.readonly`, drafts via `gmail.compose`); do not auto-send without owner action in Gmail.
- Use **user-delegated OAuth** (each business connects their Google account).
- If Google verification cost or timeline is blocking, evaluate **email middleware** (e.g. Nylas) as a paid platform alternative — shifts cost from compliance project to subscription.

---

## HubSpot

### API access

- **Free to build.** [HubSpot CRM API v3](https://developers.hubspot.com/docs/api-reference/crm/introduction), private apps, and OAuth public apps. HubSpot also exposes a **remote MCP server** for agent-style tooling.

### Owner cost

- **Free tier possible.** [Free HubSpot CRM](https://www.hubspot.com/products/crm) includes API access with **tier-based rate limits** (higher on Starter / Professional / Enterprise; optional API limit increase add-on).
- Agent-heavy usage (frequent contact/deal updates per conversation) may push owners to **paid HubSpot** or the API add-on.

### Fetch platform cost

- **Low–medium.** Register a HubSpot developer app; no revenue share for basic CRM read/write. Marketing Email / transactional products are separate SKUs and policies.

### Partnership

- **Not required** to connect customer portals.
- **Optional:** [HubSpot App Marketplace](https://developers.hubspot.com/) for discoverability — review process, not a prerequisite for OAuth connect.

### Feasibility verdict

| Stage | Verdict |
|-------|---------|
| **MVP** | **Strong yes** — matches ASI:one demo (contact, deal, notes, stage updates) |
| **Production** | **Yes** — implement rate-limit handling, caching, and clear errors when a portal hits caps |

### Recommendations

- Ship **OAuth + CRM objects** (contacts, deals, notes, activities) first.
- Defer **marketing email send** via HubSpot until compliance and unsubscribe rules are defined.
- Document **BYOA**: each business authorizes **their** HubSpot portal; Fetch does not resell HubSpot seats.

---

## Calendly

### API access

- **Free to build (developer account).** [Calendly API v2](https://developer.calendly.com/) including the **Scheduling API**, which Calendly documents for programmatic and AI-agent booking flows.

### Owner cost

- **Paid plan required for agent booking.** Public Calendly documentation states that the **Scheduling API** (and webhooks on many tiers) require the user to be on a **paid plan** (e.g. Standard, Teams, Enterprise — confirm current plan names on [Calendly API overview](https://help.calendly.com/hc/en-us/articles/223195488-Calendly-API-overview)).
- General read-only API access may be broader; **do not equate “free Calendly user” with “agent can book meetings.”**

### Fetch platform cost

- **Low.** Create an OAuth app in the Calendly developer portal; no Fetch-wide license fee identified in public docs.

### Partnership

- **Not required** for API-based BYOA integration.

### Feasibility verdict

| Stage | Verdict |
|-------|---------|
| **MVP with paid Calendly owners** | **Yes** — event types → available times → create invitee |
| **MVP with free Calendly owners** | **Partial** — fallback to **scheduling links in Gmail drafts**, not Scheduling API |

### Recommendations

- At connect time, detect whether **Scheduling API** is available for that account; gate auto-book UI accordingly.
- Pair with **Google Calendar** (free/busy) where useful; calendar API shares Google Cloud OAuth work with Gmail if both are offered.
- Keep **owner approval** for high-stakes booking changes (cancel/reschedule) in early releases.

---

## Combined funnel (Gmail + HubSpot + Calendly)

These three are feasible together **without paid vendor partnerships** when modeled as BYOA:

```
Inbound (Gmail) → Memory (HubSpot) → Meeting (Calendly) → Confirm (Gmail draft)
```

| Cost bearer | What they pay |
|-------------|----------------|
| **Fetch** | Engineering, hosting, **Google OAuth compliance** (largest unknown), HubSpot/Calendly app maintenance |
| **Business owner** | HubSpot tier if outgrowing free limits; **paid Calendly** for programmatic booking; Google account / Workspace |
| **End customer** | Nothing direct to vendors |

---

## Comparison at a glance

| | Gmail | HubSpot | Calendly |
|---|--------|---------|----------|
| **Best for** | Inbound email, drafts, quotes | CRM memory, deal stages | Closing the loop with a real meeting |
| **Partnership** | No | Optional marketplace | No |
| **Hardest part** | Google restricted scopes | Rate limits on free tier | Owner must have right Calendly plan |
| **MVP priority** | High value, high compliance | **Easiest CRM path** | High value if plan check is built |

---

## Risks and unknowns

- **Google security assessment** — largest single cost/timeline risk for Gmail in production.
- **HubSpot rate limits** — agent loops could exhaust daily caps on free portals; needs backoff and caching.
- **Calendly plan drift** — plan names and API entitlements change; re-check docs before launch.
- **Vendor AI policies** — Google, HubSpot, and Calendly may update acceptable-use rules for autonomous agents.

---

## Conclusion

**Gmail, HubSpot, and Calendly can all be integrated without buying API licenses or signing ISV partnerships for a BYOA MVP.**

- **HubSpot** is the most straightforward production path (free API, optional free CRM).
- **Calendly** is straightforward technically but **requires the owner’s paid plan** for real agent scheduling.
- **Gmail** is the highest **platform** investment because of Google OAuth and possible security assessment — not because Google charges per API call.

Fetch should label the product honestly: integrations are **free to connect** in the sense of no extra Fetch fee, while **owners** pay Calendly/HubSpot/Google where those vendors require it, and **Fetch** budgets Gmail compliance for scale.

---

*Based on public vendor documentation and common ISV practice as of May 2026. Confirm current plan names, rate limits, and policies with Google, HubSpot, and Calendly before contractual commitments.*
