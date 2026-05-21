/** Integration catalog organized by how business owners think about their stack */

export const integrationCategories = [
  {
    id: 'payments',
    title: 'Get paid',
    description: 'Payments, invoicing, and accounting your agent can reference or trigger.',
    apps: [
      { name: 'Stripe', category: 'Payments', locked: true, defaultEnabled: false, logo: { bg: 'bg-indigo-600', label: 'S' } },
      { name: 'Square', category: 'Payments & POS', locked: true, defaultEnabled: false, logo: { bg: 'bg-gray-900', label: '□' } },
      { name: 'PayPal', category: 'Payments', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-700', label: 'P' } },
      { name: 'QuickBooks', category: 'Accounting', locked: true, defaultEnabled: false, logo: { bg: 'bg-green-600', label: 'QB' } },
      { name: 'Xero', category: 'Accounting', locked: true, defaultEnabled: false, logo: { bg: 'bg-sky-500', label: 'X' } },
    ],
  },
  {
    id: 'commerce',
    title: 'Sell online',
    description: 'Storefronts, inventory, and fulfillment for product businesses.',
    apps: [
      { name: 'Shopify', category: 'E-commerce', locked: true, defaultEnabled: false, logo: { bg: 'bg-green-600', label: 'S' } },
      { name: 'WooCommerce', category: 'E-commerce', locked: true, defaultEnabled: false, logo: { bg: 'bg-purple-700', label: 'W' } },
      { name: 'BigCommerce', category: 'E-commerce', locked: true, defaultEnabled: false, logo: { bg: 'bg-slate-800', label: 'B' } },
      { name: 'ShipStation', category: 'Shipping', locked: true, defaultEnabled: false, logo: { bg: 'bg-emerald-600', label: 'SS' } },
      { name: 'Shippo', category: 'Shipping', locked: true, defaultEnabled: false, logo: { bg: 'bg-teal-600', label: 'Sh' } },
      { name: 'Cin7', category: 'Inventory', locked: true, defaultEnabled: false, logo: { bg: 'bg-orange-600', label: 'C7' } },
    ],
  },
  {
    id: 'scheduling',
    title: 'Book & meet',
    description: 'Scheduling and video so your agent can book time without double-booking.',
    apps: [
      { name: 'Google Calendar', category: 'Calendar', locked: false, defaultEnabled: true, logo: { bg: 'bg-blue-500', label: '📅' } },
      {
        name: 'Calendly',
        category: 'Scheduling',
        locked: false,
        finalized: true,
        slug: 'calendly',
        defaultEnabled: false,
        logo: { bg: 'bg-blue-600', label: 'C' },
      },
      { name: 'Acuity Scheduling', category: 'Scheduling', locked: true, defaultEnabled: false, logo: { bg: 'bg-rose-500', label: 'A' } },
      { name: 'Microsoft 365 Calendar', category: 'Calendar', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-700', label: 'M' } },
      { name: 'Zoom', category: 'Video meetings', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-500', label: 'Z' } },
      { name: 'Google Meet', category: 'Video meetings', locked: true, defaultEnabled: false, logo: { bg: 'bg-green-600', label: 'M' } },
    ],
  },
  {
    id: 'communication',
    title: 'Talk to customers',
    description: 'Email, messaging, and SMS where customers actually reach you.',
    apps: [
      {
        name: 'Gmail',
        category: 'Email',
        locked: false,
        finalized: true,
        slug: 'gmail',
        defaultEnabled: false,
        logo: { bg: 'bg-red-500', label: 'G' },
      },
      { name: 'Outlook', category: 'Email', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-600', label: 'O' } },
      { name: 'WhatsApp Business', category: 'Messaging', locked: true, defaultEnabled: false, logo: { bg: 'bg-green-500', label: 'WA' } },
      { name: 'Twilio SMS', category: 'SMS', locked: true, defaultEnabled: false, logo: { bg: 'bg-red-600', label: 'T' } },
    ],
  },
  {
    id: 'crm',
    title: 'Grow pipeline',
    description: 'CRM and leads so your agent knows who customers are and what stage they are in.',
    apps: [
      {
        name: 'HubSpot',
        category: 'CRM',
        locked: false,
        finalized: true,
        slug: 'hubspot',
        defaultEnabled: false,
        logo: { bg: 'bg-orange-600', label: 'H' },
      },
      { name: 'Salesforce', category: 'CRM', locked: true, defaultEnabled: false, logo: { bg: 'bg-sky-600', label: 'SF' } },
      { name: 'Pipedrive', category: 'CRM', locked: true, defaultEnabled: false, logo: { bg: 'bg-green-700', label: 'P' } },
      { name: 'Zoho CRM', category: 'CRM', locked: true, defaultEnabled: false, logo: { bg: 'bg-red-600', label: 'Z' } },
    ],
  },
  {
    id: 'support',
    title: 'Support & reputation',
    description: 'Help desk and local presence when the agent needs to escalate or answer FAQs.',
    apps: [
      { name: 'Zendesk', category: 'Support', locked: true, defaultEnabled: false, logo: { bg: 'bg-emerald-700', label: 'Z' } },
      { name: 'Intercom', category: 'Support', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-600', label: 'I' } },
      { name: 'Freshdesk', category: 'Support', locked: true, defaultEnabled: false, logo: { bg: 'bg-green-600', label: 'F' } },
      { name: 'Google Business Profile', category: 'Local presence', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-500', label: 'G' } },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & social',
    description: 'Social, email campaigns, and design — pairs with your Socials Library.',
    apps: [
      { name: 'Meta Business Suite', category: 'Instagram & Facebook', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-600', label: 'Meta' } },
      { name: 'LinkedIn', category: 'Social', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-700', label: 'in' } },
      { name: 'Mailchimp', category: 'Email marketing', locked: true, defaultEnabled: false, logo: { bg: 'bg-yellow-500', label: 'MC', text: 'text-gray-900' } },
      { name: 'Klaviyo', category: 'Email marketing', locked: true, defaultEnabled: false, logo: { bg: 'bg-emerald-800', label: 'K' } },
      { name: 'Canva', category: 'Design', locked: true, defaultEnabled: false, logo: { bg: 'bg-cyan-500', label: 'Ca' } },
    ],
  },
  {
    id: 'security',
    title: 'Security & contracts',
    description: 'E-signatures, team access, and read-only finance connections.',
    apps: [
      { name: 'DocuSign', category: 'E-signatures', locked: true, defaultEnabled: false, logo: { bg: 'bg-yellow-400', label: 'DS', text: 'text-gray-900' } },
      { name: 'HelloSign', category: 'E-signatures', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-500', label: 'H' } },
      { name: 'Okta SSO', category: 'Team access', locked: true, defaultEnabled: false, logo: { bg: 'bg-blue-800', label: 'O' } },
      { name: 'Plaid', category: 'Finance (read-only)', locked: true, defaultEnabled: false, logo: { bg: 'bg-black', label: 'P' } },
    ],
  },
]

export const allIntegrationApps = integrationCategories.flatMap((c) => c.apps)

export function getDefaultIntegrations() {
  return Object.fromEntries(
    allIntegrationApps.map((app) => [app.name, app.defaultEnabled ?? false]),
  )
}

/** @deprecated use allIntegrationApps */
export const integrationApps = allIntegrationApps

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
