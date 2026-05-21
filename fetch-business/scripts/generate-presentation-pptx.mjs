import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pptxgen from 'pptxgenjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'docs')
const outFile = path.join(outDir, 'Fetch-Business-Integrations-Presentation.pptx')

fs.mkdirSync(outDir, { recursive: true })

/** ASI:one demo palette (matches Asi1Demo.jsx) */
const COLORS = {
  green: '3DDC84',
  bg: '141416',
  sidebar: '0F0F11',
  surface: '1C1C1F',
  border: '2A2A2E',
  white: 'FFFFFF',
  muted: 'A1A1AA',
  dim: '71717A',
  black: '141416',
  gmail: 'EA4335',
  hubspot: 'FF7A59',
  calendly: '006BFF',
}

const FONT = 'Arial'

function setDarkSlideBg(slide) {
  slide.background = { color: COLORS.bg }
}

function addTitleSlide(pres, title, subtitle) {
  const slide = pres.addSlide()
  setDarkSlideBg(slide)

  // Logo dots (2x2 green grid)
  ;[0, 1, 2, 3].forEach((i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.6 + (i % 2) * 0.14,
      y: 1.35 + Math.floor(i / 2) * 0.14,
      w: 0.1,
      h: 0.1,
      fill: { color: COLORS.green },
    })
  })
  slide.addText('ASI:one', {
    x: 0.95,
    y: 1.28,
    w: 2,
    h: 0.45,
    fontSize: 22,
    bold: true,
    color: COLORS.white,
    fontFace: FONT,
  })
  slide.addText(title, {
    x: 0.6,
    y: 2.2,
    w: 8.8,
    h: 1.2,
    fontSize: 36,
    bold: true,
    color: COLORS.white,
    fontFace: FONT,
  })
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6,
      y: 3.5,
      w: 8.8,
      h: 0.8,
      fontSize: 18,
      color: COLORS.muted,
      fontFace: FONT,
    })
  }
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6,
    y: 5.0,
    w: 2.0,
    h: 0.08,
    fill: { color: COLORS.green },
  })
  slide.addText('May 2026 · Fetch Business', {
    x: 0.6,
    y: 5.2,
    w: 4,
    h: 0.4,
    fontSize: 12,
    color: COLORS.dim,
    fontFace: FONT,
  })
}

function addSectionSlide(pres, title) {
  const slide = pres.addSlide()
  slide.background = { color: COLORS.green }
  slide.addText(title, {
    x: 0.6,
    y: 2.4,
    w: 8.8,
    h: 1,
    fontSize: 32,
    bold: true,
    color: COLORS.black,
    fontFace: FONT,
  })
}

function addContentSlide(pres, title, bullets, notes) {
  const slide = pres.addSlide()
  setDarkSlideBg(slide)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.95,
    fill: { color: COLORS.surface },
  })
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0.95,
    w: 10,
    h: 0.03,
    fill: { color: COLORS.green },
  })
  slide.addText(title, {
    x: 0.5,
    y: 0.22,
    w: 9,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLORS.white,
    fontFace: FONT,
  })
  slide.addText(
    bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })),
    {
      x: 0.55,
      y: 1.2,
      w: 8.9,
      h: 4.2,
      fontSize: 16,
      color: COLORS.muted,
      fontFace: FONT,
      valign: 'top',
      lineSpacingMultiple: 1.15,
    },
  )
  if (notes) slide.addNotes(notes)
}

function addTableSlide(pres, title, headers, rows) {
  const slide = pres.addSlide()
  setDarkSlideBg(slide)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.95,
    fill: { color: COLORS.surface },
  })
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0.95,
    w: 10,
    h: 0.03,
    fill: { color: COLORS.green },
  })
  slide.addText(title, {
    x: 0.5,
    y: 0.22,
    w: 9,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLORS.white,
    fontFace: FONT,
  })
  const tableData = [
    headers.map((h) => ({
      text: h,
      options: { bold: true, fill: { color: COLORS.green }, color: COLORS.black },
    })),
    ...rows.map((row, ri) =>
      row.map((cell) => ({
        text: cell,
        options: {
          fontSize: 11,
          color: COLORS.muted,
          fill: { color: ri % 2 === 0 ? COLORS.surface : COLORS.sidebar },
        },
      })),
    ),
  ]
  const colCount = headers.length
  const colW = Array(colCount).fill(9.3 / colCount)
  slide.addTable(tableData, {
    x: 0.35,
    y: 1.1,
    w: 9.3,
    colW,
    fontSize: 11,
    border: { pt: 0.5, color: COLORS.border },
    align: 'left',
    valign: 'middle',
  })
}

function addFunnelSlide(pres) {
  const slide = pres.addSlide()
  setDarkSlideBg(slide)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.95,
    fill: { color: COLORS.surface },
  })
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0.95,
    w: 10,
    h: 0.03,
    fill: { color: COLORS.green },
  })
  slide.addText('The integration funnel', {
    x: 0.5,
    y: 0.22,
    w: 9,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLORS.white,
    fontFace: FONT,
  })

  const steps = [
    { label: 'Gmail', sub: 'Inbound & drafts', color: COLORS.gmail },
    { label: 'HubSpot', sub: 'CRM memory', color: COLORS.hubspot },
    { label: 'Calendly', sub: 'Book the meeting', color: COLORS.calendly },
    { label: 'Gmail', sub: 'Confirm & quote', color: COLORS.gmail },
  ]

  steps.forEach((step, i) => {
    const x = 0.5 + i * 2.35
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x,
      y: 2.0,
      w: 2.0,
      h: 1.4,
      fill: { color: step.color },
      rectRadius: 0.08,
    })
    slide.addText(step.label, {
      x,
      y: 2.25,
      w: 2.0,
      h: 0.5,
      fontSize: 18,
      bold: true,
      color: COLORS.white,
      align: 'center',
      fontFace: FONT,
    })
    slide.addText(step.sub, {
      x,
      y: 2.75,
      w: 2.0,
      h: 0.4,
      fontSize: 11,
      color: 'E8E8E8',
      align: 'center',
      fontFace: FONT,
    })
    if (i < steps.length - 1) {
      slide.addText('→', {
        x: x + 2.05,
        y: 2.45,
        w: 0.35,
        h: 0.4,
        fontSize: 22,
        color: COLORS.green,
        align: 'center',
      })
    }
  })

  slide.addText(
    'One natural SMB journey: hear the customer → remember them → meet them → confirm in email',
    {
      x: 0.5,
      y: 4.0,
      w: 9,
      h: 0.6,
      fontSize: 14,
      italic: true,
      color: COLORS.dim,
      fontFace: FONT,
    },
  )
  slide.addText(
    'Bring-your-own-account (BYOA): each business connects their own Gmail, HubSpot, and Calendly.',
    {
      x: 0.5,
      y: 4.65,
      w: 9,
      h: 0.5,
      fontSize: 13,
      bold: true,
      color: COLORS.green,
      fontFace: FONT,
    },
  )
}

function addIntegrationDetailSlide(pres, name, accentColor, sections) {
  const slide = pres.addSlide()
  setDarkSlideBg(slide)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 10,
    h: 1.0,
    fill: { color: accentColor },
  })
  slide.addText(name, {
    x: 0.5,
    y: 0.25,
    w: 9,
    h: 0.65,
    fontSize: 28,
    bold: true,
    color: COLORS.white,
    fontFace: FONT,
  })

  let y = 1.2
  sections.forEach(({ heading, items }) => {
    slide.addText(heading, {
      x: 0.5,
      y,
      w: 8.5,
      h: 0.35,
      fontSize: 13,
      bold: true,
      color: COLORS.green,
      fontFace: FONT,
    })
    slide.addText(
      items.map((t) => ({ text: t, options: { bullet: true, breakLine: true } })),
      {
        x: 0.5,
        y: y + 0.35,
        w: 8.5,
        h: Math.min(items.length * 0.38, 1.8),
        fontSize: 12,
        color: COLORS.muted,
        fontFace: FONT,
      },
    )
    y += 0.35 + items.length * 0.32 + 0.25
  })
}

const pres = new pptxgen()
pres.author = 'Fetch Business'
pres.title = 'Fetch Business — Gmail, HubSpot & Calendly'
pres.subject = 'Integrations feasibility and MVP strategy'
pres.layout = 'LAYOUT_16x9'

addTitleSlide(
  pres,
  'Fetch Business Integrations',
  'Gmail · HubSpot · Calendly — MVP strategy & feasibility',
)

addContentSlide(pres, 'Agenda', [
  'What we built in the Fetch Business workbench',
  'Why Gmail, HubSpot, and Calendly',
  'Feasibility: free API vs owner cost vs Fetch compliance',
  'BYOA (bring-your-own-account) model',
  'ASI:one consumer POC demo',
  'Risks, recommendations, and next steps',
])

addContentSlide(pres, 'Fetch Business workbench (rebuild)', [
  'React + Vite dashboard mirroring business.fetch.ai',
  'Agents, profile, workflows, orders, chats, integrations',
  '~38 integrations catalogued by owner workflow (payments, CRM, scheduling, etc.)',
  'Three integrations deep-researched and finalized: Gmail, HubSpot, Calendly',
  'Interactive POC: connect toggles, detail pages, ASI:one consumer demo at /demo/asi1',
  'State persists in localStorage for demos and testing',
])

addSectionSlide(pres, 'Why these three?')

addContentSlide(pres, 'Why Gmail, HubSpot & Calendly', [
  'Email is where inbound leads and quotes still land for most SMBs',
  'Without CRM memory, every conversation feels like the first — HubSpot is the default growth CRM',
  'Booking a call is often the real conversion — Calendly closes the scheduling loop',
  'Together they form one funnel: hear → remember → meet → confirm',
  'Deeper than adding dozens of toggles with no story for the business owner',
])

addFunnelSlide(pres)

addSectionSlide(pres, 'Feasibility')

addTableSlide(
  pres,
  'Executive summary',
  ['Integration', 'Free API?', 'Owner pays?', 'Partnership?', 'Main friction'],
  [
    ['Gmail', 'Yes', 'Gmail / Workspace', 'No', 'Google OAuth restricted scopes'],
    ['HubSpot', 'Yes', 'Free CRM → paid at scale', 'Optional', 'API rate limits'],
    ['Calendly', 'Yes', 'Paid plan for Scheduling API', 'No', 'Plan eligibility check'],
  ],
)

addContentSlide(pres, 'What “feasible” means', [
  'Free to build ≠ free to operate',
  'APIs: generally no license fee to Google, HubSpot, or Calendly',
  'Business owner: may need paid Calendly, HubSpot tier, existing Google mailbox',
  'Fetch: engineering + hosting + Gmail OAuth compliance at scale',
  'Partnerships: not required for BYOA MVP; optional for marketplaces later',
])

addIntegrationDetailSlide(pres, 'Gmail — Feasibility', COLORS.gmail, [
  {
    heading: 'API & owner',
    items: [
      'Gmail API free to integrate; Gmail MCP in developer preview',
      'Owner uses Gmail or Google Workspace (often already paid)',
    ],
  },
  {
    heading: 'Fetch platform cost',
    items: [
      'Restricted scopes: readonly, compose, modify',
      'OAuth verification: brand ~2–3 days; restricted ~6 weeks',
      'Possible security assessment if mail stored on Fetch servers',
    ],
  },
  {
    heading: 'Verdict & MVP',
    items: [
      'Partnership: not required',
      'MVP: read + draft only; never auto-send',
      'Production: yes, with compliance budget',
    ],
  },
])

addIntegrationDetailSlide(pres, 'HubSpot — Feasibility', COLORS.hubspot, [
  {
    heading: 'API & owner',
    items: [
      'CRM v3 API, OAuth, private apps; remote MCP server',
      'Free CRM tier includes API with rate limits',
      'Heavy agent usage may need paid HubSpot or API add-on',
    ],
  },
  {
    heading: 'Fetch platform cost',
    items: [
      'Low: developer app registration',
      'No revenue share for basic CRM read/write',
    ],
  },
  {
    heading: 'Verdict & MVP',
    items: [
      'Partnership: optional (App Marketplace)',
      'Strongest production path of the three',
      'Ship contacts, deals, notes, activities first',
    ],
  },
])

addIntegrationDetailSlide(pres, 'Calendly — Feasibility', COLORS.calendly, [
  {
    heading: 'API & owner',
    items: [
      'API v2 + Scheduling API (documented for AI agents)',
      'Scheduling API requires owner paid Calendly plan',
      'Free Calendly ≠ agent can auto-book meetings',
    ],
  },
  {
    heading: 'Fetch platform cost',
    items: ['Low: OAuth app in Calendly developer portal'],
  },
  {
    heading: 'Verdict & MVP',
    items: [
      'Partnership: not required',
      'MVP: yes when owner has paid plan',
      'Fallback: scheduling link in Gmail draft',
      'Detect Scheduling API at connect time',
    ],
  },
])

addTableSlide(
  pres,
  'Who pays what?',
  ['Bearer', 'Gmail', 'HubSpot', 'Calendly'],
  [
    ['Fetch', 'OAuth compliance, engineering', 'App maintenance', 'OAuth app'],
    ['Business owner', 'Google account', 'CRM tier if needed', 'Paid Calendly plan'],
    ['End customer', '—', '—', '—'],
  ],
)

addTableSlide(
  pres,
  'Comparison at a glance',
  ['', 'Gmail', 'HubSpot', 'Calendly'],
  [
    ['Best for', 'Inbox & drafts', 'Pipeline memory', 'Meeting booking'],
    ['Hardest part', 'Google verification', 'Rate limits', 'Owner plan check'],
    ['MVP priority', 'High value, high compliance', 'Easiest path', 'High value w/ gating'],
  ],
)

addSectionSlide(pres, 'Consumer POC')

addContentSlide(pres, 'ASI:one consumer demo (/demo/asi1)', [
  'Dark UI matching ASI:one — green accents, sidebar, chat workspace',
  'Point of view: cafe owner uses personal agent on ASI:one',
  'Discovers Business AI in Fetch directory → A2A handshake',
  'Negotiates Instagram help; HubSpot creates contact & deal',
  'Calendly offers slots; meeting confirmed; Gmail draft for owner approval',
  'Owner panel shows integration activity invisible to the consumer',
])

addSectionSlide(pres, 'Risks & next steps')

addContentSlide(pres, 'Key risks', [
  'Google security assessment — largest cost/timeline unknown for Gmail',
  'HubSpot rate limits on free portals — need caching and backoff',
  'Calendly plan names and API entitlements may change',
  'Vendor AI / autonomous-agent policies evolving',
])

addContentSlide(pres, 'Recommendations', [
  'Phase 1 MVP: Gmail (read/draft), HubSpot CRM, Calendly + plan check',
  'BYOA everywhere — businesses connect their own accounts',
  'Honest UI labels: paid Calendly required, Google verification status',
  'Do not promise auto-book on free Calendly or auto-send from Gmail',
  'Confirm plan names and rate limits with vendors before launch commitments',
])

addTitleSlide(pres, 'Thank you', 'Questions · Fetch Business integrations MVP')

await pres.writeFile({ fileName: outFile })
console.log('Wrote', outFile)
