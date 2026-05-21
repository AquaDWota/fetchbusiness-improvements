/**
 * Deep research & finalized agent use cases for priority integrations.
 * Selected: Gmail, HubSpot, Calendly — cover communication, revenue, and scheduling.
 */

export const finalizedIntegrationIds = ['gmail', 'hubspot', 'calendly']

export const integrationResearch = {
  gmail: {
    id: 'gmail',
    name: 'Gmail',
    tagline: 'Your agent as an inbox co-pilot — triage, draft, and never miss a lead.',
    whyFinalized:
      'Email is still the primary inbox for SMBs. Gmail API + Google\'s Gmail MCP preview make it the highest-leverage integration: every agent needs to read context and draft replies without sending autonomously until the owner approves.',
    apiSurface: {
      provider: 'Google Gmail API / Gmail MCP (Developer Preview)',
      auth: 'OAuth 2.0 — prefer narrow scopes (gmail.readonly, gmail.compose)',
      keyEndpoints: [
        'users.messages.list / get — thread context for the agent',
        'users.drafts.create — agent proposes replies; human sends',
        'users.labels — prioritize "Needs response" / lead labels',
      ],
      productionNotes:
        'Rate limits and token refresh matter for always-on agents. Use readonly + compose scopes, not full mail.google.com unless required. Log draft actions for owner review before send.',
    },
    agentCapabilities: [
      'Summarize overnight inbox and flag urgent threads',
      'Draft replies in brand voice (from Profile & Business Info)',
      'Extract lead intent → create HubSpot contact (when CRM connected)',
      'Attach negotiation audit snippet to outbound quote emails',
      'Never auto-send without explicit owner approval',
    ],
    useCase: {
      title: 'Use case: Inbound lead from website form',
      scenario:
        'A prospect emails "I need a quote for social media management for my cafe." Your Business AI agent reads the thread, pulls your pricing from Business Information, drafts a reply, and logs the contact in HubSpot — you review and click Send in Gmail.',
      steps: [
        { actor: 'Customer', action: 'Emails hello@cafebrand.com' },
        { actor: 'Business AI', action: 'Reads thread via Gmail (readonly scope)' },
        { actor: 'Business AI', action: 'Checks Business Info for pricing and brand voice' },
        { actor: 'Business AI', action: 'Creates gmail.draft with personalized quote' },
        { actor: 'Business AI', action: 'Creates HubSpot contact + deal in "Appointment scheduled"' },
        { actor: 'Owner', action: 'Reviews draft in Gmail, edits one line, sends' },
        { actor: 'Business AI', action: 'Logs activity: "Email draft approved by owner"' },
      ],
    },
    demoInbox: [
      {
        id: 't1',
        from: 'Sarah Chen <sarah@riversidecafe.com>',
        subject: 'Quote for social media help?',
        preview: 'Hi — I run a small cafe and need help with Instagram...',
        priority: 'high',
        agentStatus: 'Draft ready',
      },
      {
        id: 't2',
        from: 'Stripe <receipts@stripe.com>',
        subject: 'Your payout is on the way',
        preview: 'A payout of $1,240.00 will arrive in 2 business days...',
        priority: 'low',
        agentStatus: 'Archived',
      },
      {
        id: 't3',
        from: 'HubSpot <notifications@hubspot.com>',
        subject: 'Deal moved to Qualified',
        preview: 'Riverside Cafe — deal stage updated by Business AI...',
        priority: 'medium',
        agentStatus: 'Logged',
      },
    ],
    sampleDraft:
      'Hi Sarah,\n\nThanks for reaching out! I help cafes grow on Instagram with 3 posts/week and monthly analytics. Packages start at $400/mo.\n\nWould you like a 15-min call this week? I can send a Calendly link.\n\n— Business AI (draft · awaiting your approval)',
  },

  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    tagline: 'CRM memory for your agent — every chat, deal, and A2A interaction in one pipeline.',
    whyFinalized:
      'Without CRM context, an agent treats every consumer as new. HubSpot\'s CRM APIs and remote MCP server give structured read/write to contacts, deals, and activities — ideal for logging agent-to-agent commerce and human handoffs.',
    apiSurface: {
      provider: 'HubSpot CRM API v3 / HubSpot MCP Server (remote)',
      auth: 'OAuth or Private App token — respect portal user permissions',
      keyEndpoints: [
        'crm/v3/objects/contacts — search, create, update',
        'crm/v3/objects/deals — stage, amount, close date',
        'crm/v3/objects/notes — log agent actions & A2A summaries',
        'webhooks — deal stage changes trigger agent workflows',
      ],
      productionNotes:
        'Map agent policy and quote metadata to custom HubSpot properties so sales reps see context. Use activity IDs in note bodies for traceability.',
    },
    agentCapabilities: [
      'Look up contact/deal before answering consumer agent queries',
      'Log every A2A quote or order as a CRM activity with signed audit ID',
      'Update deal stage when Calendly booking confirmed',
      'Score leads from email + chat intent',
      'Flag at-risk deals when no activity in 14 days',
    ],
    useCase: {
      title: 'Use case: Consumer agent asks for a quote (A2A → CRM)',
      scenario:
        'A consumer\'s personal agent negotiates a marketing package via Fetch A2A. Your Business AI checks HubSpot: existing contact, open deal $0. It responds with a quote, logs the negotiation to the deal timeline, and moves stage to "Quote sent."',
      steps: [
        { actor: 'Consumer Agent', action: 'A2A request: budget $500, scope social posts' },
        { actor: 'Business AI', action: 'HubSpot search: contact by consumer agent ID' },
        { actor: 'Business AI', action: 'Returns quote $450/mo (within $500 budget); logs note a2a-7d04' },
        { actor: 'Business AI', action: 'Updates deal stage → Quote sent, amount $450' },
        { actor: 'Owner', action: 'Sees timeline in HubSpot; approves contract in DocuSign later' },
      ],
    },
    demoPipeline: [
      {
        id: 'd1',
        name: 'Riverside Cafe — Social retainer',
        stage: 'Quote sent',
        amount: 450,
        contact: 'Sarah Chen',
        lastActivity: 'A2A quote logged by Business AI · 2h ago',
      },
      {
        id: 'd2',
        name: 'TechStart LLC — Launch campaign',
        stage: 'Appointment scheduled',
        amount: 1200,
        contact: 'James Wu',
        lastActivity: 'Calendly: Discovery call booked · yesterday',
      },
      {
        id: 'd3',
        name: 'Fetch IL 8 — Partner pilot',
        stage: 'Qualified',
        amount: 0,
        contact: 'Fetch.ai Directory',
        lastActivity: 'Claim workflow started · 3d ago',
      },
    ],
  },

  calendly: {
    id: 'calendly',
    name: 'Calendly',
    tagline: 'Let your agent book real meetings — no double-booking, no email ping-pong.',
    whyFinalized:
      'Google Calendar shows free/busy; Calendly\'s Scheduling API lets an agent complete booking end-to-end (event types → slots → create invitee). Official Calendly docs target AI agents for conversational scheduling — pairs perfectly with Gmail drafts that include booking links.',
    apiSurface: {
      provider: 'Calendly API v2 — Scheduling API (paid plans)',
      auth: 'OAuth 2.0 Personal Access Token or OAuth app',
      keyEndpoints: [
        'GET /event_types — map "discovery call" vs "paid consult"',
        'GET /event_type_available_times — pick slot in owner timezone',
        'POST /invitees — book without iframe (agent-native flow)',
        'Webhooks — invitee.created triggers CRM + confirmation email',
      ],
      productionNotes:
        'Sync booked events to Google Calendar integration. Enforce intent verification: agent may only book event types in signed user scope. Requires paid Calendly plan for Scheduling API.',
    },
    agentCapabilities: [
      'Offer next 3 available slots in chat or email draft',
      'Book meeting when consumer agent or user confirms slot',
      'Reschedule/cancel via API links returned in booking response',
      'Block book if Google Calendar shows conflict',
      'After book: update HubSpot deal → Appointment scheduled',
    ],
    useCase: {
      title: 'Use case: Agent closes email thread with a booked call',
      scenario:
        'After drafting a Gmail reply to Sarah, Business AI checks Calendly for 15-min discovery slots, includes two options in the draft, and when Sarah\'s consumer agent picks Tuesday 2pm UTC, books via POST /invitees and updates HubSpot.',
      steps: [
        { actor: 'Business AI', action: 'GET available times for "15-min Discovery"' },
        { actor: 'Business AI', action: 'Inserts slots into Gmail draft' },
        { actor: 'Consumer Agent', action: 'Selects Tue 2:00 PM UTC via A2A' },
        { actor: 'Business AI', action: 'POST /invitees — creates Calendly event' },
        { actor: 'Business AI', action: 'Syncs to Google Calendar; HubSpot stage update' },
        { actor: 'Sarah', action: 'Receives Calendly confirmation + Meet link' },
      ],
    },
    demoEventTypes: [
      {
        id: 'et1',
        name: '15-min Discovery Call',
        duration: '15 min',
        availability: 'Tue 2:00 PM, Wed 10:00 AM, Thu 4:30 PM',
      },
      {
        id: 'et2',
        name: 'Strategy Session',
        duration: '45 min',
        availability: 'By request — agent escalates to owner',
      },
    ],
    demoBookings: [
      {
        id: 'b1',
        invitee: 'James Wu',
        event: '15-min Discovery Call',
        time: 'Tue, May 27 · 2:00 PM UTC',
        status: 'Confirmed',
        source: 'Booked by Business AI via A2A',
      },
    ],
  },
}

export function getFinalizedResearch(id) {
  return integrationResearch[id]
}
