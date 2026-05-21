export const governanceFrontiers = [
  {
    id: 'fiduciary',
    label: 'Fiduciary Standards',
    shortLabel: 'Fiduciary',
    summary:
      'Define whether your agent optimizes for brand interests, user interests, or a balanced duty of care.',
  },
  {
    id: 'financial',
    label: 'Financial Authority',
    shortLabel: 'Financial',
    summary:
      'Graduated permission tiers for purchases — from read-only to explicit approval for large spends.',
  },
  {
    id: 'audit',
    label: 'Audit Trails',
    shortLabel: 'Audit',
    summary:
      'Tamper-proof, human-readable logs of every agent-to-agent negotiation and commitment.',
  },
  {
    id: 'consent',
    label: 'Data Consent',
    shortLabel: 'Consent',
    summary:
      'Control what personal context brand agents may infer and retain after each interaction.',
  },
  {
    id: 'adversarial',
    label: 'Threat Detection',
    shortLabel: 'Threats',
    summary:
      'Behavioral anomaly detection for agents that over-collect data or deviate from capabilities.',
  },
  {
    id: 'disclosure',
    label: 'Conflict Disclosure',
    shortLabel: 'Disclosure',
    summary:
      'Machine-readable declarations of sponsorships, affiliates, and commercial relationships.',
  },
  {
    id: 'arbitration',
    label: 'Arbitration',
    shortLabel: 'Arbitration',
    summary:
      'Neutral dispute resolution when consumer and brand agents disagree on terms or payments.',
  },
  {
    id: 'versioning',
    label: 'Behavioral Pinning',
    shortLabel: 'Versioning',
    summary:
      'Versioned behavioral contracts so consumers can pin policies or get alerts on material changes.',
  },
  {
    id: 'intent',
    label: 'Intent Verification',
    shortLabel: 'Intent',
    summary:
      'Signed user intent that cascades through multi-hop agent calls to prevent goal hijacking.',
  },
  {
    id: 'interop',
    label: 'Interoperability',
    shortLabel: 'Interop',
    summary:
      'Protocol-neutral connectivity beyond the Fetch ecosystem (MCP, A2A, Agent2Agent).',
  },
]

export const fiduciaryModes = [
  {
    id: 'brand',
    label: 'Brand Representative',
    description:
      'Agent optimizes for brand outcomes. Verified means legitimately self-interested.',
    recommended: false,
  },
  {
    id: 'balanced',
    label: 'Balanced Duty',
    description:
      'Transparent trade-offs between brand goals and user benefit. Default for business agents.',
    recommended: true,
  },
  {
    id: 'user',
    label: 'User Fiduciary',
    description:
      'Legally-style duty of care: agent must act in the consumer\'s best interest when conflicts arise.',
    recommended: false,
  },
]

export const financialTiers = [
  {
    id: 'read',
    label: 'Read-only',
    description: 'Queries, availability checks, quotes — no holds or charges.',
    enabled: true,
    limit: null,
  },
  {
    id: 'soft',
    label: 'Soft reservations',
    description: 'Temporary holds without charging payment methods.',
    enabled: true,
    limit: null,
  },
  {
    id: 'micro',
    label: 'Micro-purchases',
    description: 'Auto-commit purchases under your threshold without extra confirmation.',
    enabled: true,
    limit: 50,
  },
  {
    id: 'large',
    label: 'Large purchases',
    description: 'Always require explicit user approval before committing funds.',
    enabled: true,
    limit: null,
  },
]

export const sampleAuditLogs = [
  {
    id: 'a2a-8f3c',
    timestamp: 'May 20, 2026 · 14:32 UTC',
    action: 'Hotel reservation committed',
    amount: '$687.00',
    parties: 'Consumer Agent ↔ Business AI',
    signed: true,
  },
  {
    id: 'a2a-2b91',
    timestamp: 'May 19, 2026 · 09:15 UTC',
    action: 'Quote requested — footwear',
    amount: '$165.00 offered',
    parties: 'Consumer Agent ↔ Business AI',
    signed: true,
  },
  {
    id: 'a2a-7d04',
    timestamp: 'May 18, 2026 · 11:02 UTC',
    action: 'Location & budget shared (consent-scoped)',
    amount: '—',
    parties: 'Consumer Agent → Business AI',
    signed: true,
  },
]

export const consentDataTypes = [
  { id: 'location', label: 'Location', defaultRetention: 'session', required: false },
  { id: 'budget', label: 'Budget range', defaultRetention: 'session', required: false },
  { id: 'preferences', label: 'Preferences', defaultRetention: '30d', required: false },
  { id: 'loyalty', label: 'Loyalty IDs', defaultRetention: 'none', required: false },
  { id: 'purchase-history', label: 'Purchase history', defaultRetention: 'none', required: false },
]

export const threatAlerts = [
  {
    id: 1,
    severity: 'low',
    agent: 'Fetch IL 8',
    message: 'Elevated data requests (3 fields above baseline)',
    status: 'monitoring',
  },
  {
    id: 2,
    severity: 'info',
    agent: 'Directory scan',
    message: 'No quarantined agents in your namespace',
    status: 'clear',
  },
]

export const behavioralVersions = [
  {
    version: 'v2.4.1',
    date: 'May 1, 2026',
    status: 'current',
    changes: 'Stricter disclosure on affiliate recommendations',
  },
  {
    version: 'v2.3.0',
    date: 'Mar 12, 2026',
    status: 'pinned',
    changes: 'Initial fiduciary-balanced policy set',
  },
  {
    version: 'v2.2.0',
    date: 'Jan 8, 2026',
    status: 'archived',
    changes: 'Legacy brand-first optimization (deprecated)',
  },
]

export const interoperabilityProtocols = [
  {
    id: 'fetch-a2a',
    name: 'Fetch A2A',
    status: 'connected',
    description: 'Native agent-to-agent protocol for the Fetch directory.',
  },
  {
    id: 'mcp',
    name: 'Anthropic MCP',
    status: 'available',
    description: 'Model Context Protocol bridge for tool and data exchange.',
  },
  {
    id: 'google-a2a',
    name: 'Google Agent2Agent',
    status: 'available',
    description: 'Cross-provider agent messaging and capability discovery.',
  },
  {
    id: 'open-a2a',
    name: 'Open A2A (draft)',
    status: 'beta',
    description: 'Industry-neutral standard co-developed for protocol portability.',
  },
]

export const disclosureFields = [
  { id: 'affiliate', label: 'Affiliate commissions', enabled: true },
  { id: 'sponsored', label: 'Sponsored placements', enabled: true },
  { id: 'bundle', label: 'Bundle incentives', enabled: false },
  { id: 'partnership', label: 'Brand partnerships', enabled: true },
]
