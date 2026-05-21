import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'docs')
const outFile = path.join(outDir, 'Integrations-Feasibility-Report.docx')

fs.mkdirSync(outDir, { recursive: true })

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ text, heading: level, spacing: { after: 200 } })
}

function para(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 22 })],
  })
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22 })],
  })
}

function tableRow(cells, header = false) {
  return new TableRow({
    children: cells.map(
      (text) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text, bold: header, size: 20 })],
            }),
          ],
        }),
    ),
  })
}

const summaryTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    tableRow(
      [
        'Integration',
        'Free to build API?',
        'Owner must pay?',
        'Partnership required?',
        'Main friction',
      ],
      true,
    ),
    tableRow([
      'Gmail',
      'Yes',
      'Gmail / Workspace',
      'No',
      'Google OAuth restricted scopes; possible security assessment',
    ]),
    tableRow([
      'HubSpot',
      'Yes',
      'Free CRM possible; scale → paid',
      'No (marketplace optional)',
      'API rate limits per portal',
    ]),
    tableRow([
      'Calendly',
      'Yes (dev portal)',
      'Yes — paid plan for Scheduling API',
      'No',
      'Verify owner plan supports Scheduling API',
    ]),
  ],
})

const children = [
  heading('Gmail, HubSpot & Calendly — Feasibility Report'),
  para('May 21, 2026 · Scope: three finalized integrations only.'),

  heading('Executive summary', HeadingLevel.HEADING_2),
  summaryTable,
  bullet('APIs are generally free to integrate; owners pay SaaS where required; Fetch pays engineering and Gmail compliance.'),
  bullet('No ISV partnerships required for BYOA (bring-your-own-account) MVP.'),
  bullet('Calendly auto-booking requires the owner paid plan — not free Calendly.'),
  bullet('Gmail production scale needs Google OAuth verification, not API license fees.'),

  heading('Gmail', HeadingLevel.HEADING_2),
  bullet('Build: Gmail API free; Gmail MCP in developer preview.'),
  bullet('Owner: Gmail or Google Workspace.'),
  bullet('Fetch: High platform cost — restricted scope OAuth verification (weeks); possible paid security assessment if mail is stored on Fetch servers.'),
  bullet('Partnership: Not required.'),
  bullet('MVP: Yes (test/pilot). Production: Yes with compliance budget.'),
  bullet('Recommendation: Read + draft only; no auto-send; user-delegated OAuth.'),

  heading('HubSpot', HeadingLevel.HEADING_2),
  bullet('Build: CRM v3 API, private apps, OAuth, remote MCP server.'),
  bullet('Owner: Free CRM possible; heavy agent use may need paid tier or API add-on.'),
  bullet('Fetch: Low platform cost — developer app only.'),
  bullet('Partnership: Optional App Marketplace listing.'),
  bullet('MVP: Strong yes — contacts, deals, notes, activities.'),
  bullet('Recommendation: OAuth + CRM objects first; BYOA per business portal.'),

  heading('Calendly', HeadingLevel.HEADING_2),
  bullet('Build: API v2 + Scheduling API (documented for AI agents).'),
  bullet('Owner: Paid plan required for Scheduling API and webhooks on many tiers.'),
  bullet('Fetch: Low — OAuth app in developer portal.'),
  bullet('Partnership: Not required.'),
  bullet('MVP: Yes with paid Calendly; fallback = scheduling link in Gmail draft.'),
  bullet('Recommendation: Detect Scheduling API at connect time; gate auto-book UI.'),

  heading('Combined funnel', HeadingLevel.HEADING_2),
  para('Gmail (inbound) → HubSpot (memory) → Calendly (meeting) → Gmail (confirmation draft).'),
  bullet('Fetch pays: engineering, hosting, Google compliance.'),
  bullet('Owner pays: HubSpot tier if needed, paid Calendly for booking, Google account.'),
  bullet('End customer: no direct vendor fees.'),

  heading('Comparison', HeadingLevel.HEADING_2),
  bullet('Easiest production path: HubSpot.'),
  bullet('Highest platform friction: Gmail.'),
  bullet('Clearest owner requirement: paid Calendly for programmatic booking.'),

  heading('Conclusion', HeadingLevel.HEADING_2),
  para(
    'All three can ship as BYOA without API license fees or mandatory partnerships. HubSpot is the most straightforward; Calendly needs owner paid plans for Scheduling API; Gmail needs Google OAuth investment at scale.',
  ),
]

const doc = new Document({ sections: [{ children }] })
const buffer = await Packer.toBuffer(doc)
fs.writeFileSync(outFile, buffer)
console.log('Wrote', outFile)
