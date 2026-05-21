import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from 'docx'
import { integrationResearch } from '../src/data/integrationResearch.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'docs')
const outFile = path.join(outDir, 'Gmail-HubSpot-Calendly-Integrations-Report.docx')

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

const ids = ['gmail', 'hubspot', 'calendly']

const children = [
  heading('Why Include Gmail, HubSpot & Calendly'),
  para(
    'This report explains why these three integrations are a strong choice for Fetch Business agents — from the perspective of a business owner who needs an agent to turn interest into relationships and booked meetings.',
  ),

  heading('The core idea', HeadingLevel.HEADING_2),
  para(
    'Most small and mid-sized businesses do not fail because they lack an AI agent. They fail because the agent cannot plug into how work already happens: email for inbound interest, a CRM for remembering who people are, and scheduling for closing the next step. Gmail, HubSpot, and Calendly cover those three jobs better than any other combination in a typical owner\'s stack.',
  ),
  para(
    'Including all three is a good idea because they complete one natural funnel — hear the customer, remember the customer, meet the customer — instead of offering dozens of disconnected app toggles with no clear story.',
  ),

  heading('Why include Gmail', HeadingLevel.HEADING_2),
  para(integrationResearch.gmail.tagline),
  bullet('Email is still where leads, quotes, and follow-ups land for most owners.'),
  bullet('An agent that cannot read the inbox is blind to why someone reached out and what was already promised.'),
  bullet('Drafting replies (rather than replacing the owner entirely) fits how owners actually work: they want help, not autopilot on sensitive messages.'),
  bullet('Every other integration becomes more valuable when the agent can act on real conversations — a HubSpot contact means little if the agent never saw the email that started the relationship.'),
  para(integrationResearch.gmail.whyFinalized),

  heading('Why include HubSpot', HeadingLevel.HEADING_2),
  para(integrationResearch.hubspot.tagline),
  bullet('Without CRM memory, every conversation feels like the first — bad for trust and bad for sales.'),
  bullet('Owners need one place to see deals, stages, and history; HubSpot is already the default for growth-minded SMBs.'),
  bullet('When consumer agents negotiate via Fetch, the business agent must log what was quoted, to whom, and at what stage — CRM is where that accountability lives.'),
  bullet('Gmail brings the message; HubSpot brings the memory. Including HubSpot is a good idea because it turns scattered chats into a pipeline the owner can manage.'),
  para(integrationResearch.hubspot.whyFinalized),

  heading('Why include Calendly', HeadingLevel.HEADING_2),
  para(integrationResearch.calendly.tagline),
  bullet('Interest that stops at email dies in "let me know your availability" loops.'),
  bullet('Owners sell services, advice, and high-trust products — booking a call is often the real conversion event.'),
  bullet('An agent that can offer real time slots and confirm a meeting removes friction that email alone cannot fix.'),
  bullet('Calendly pairs naturally with Gmail (offer times in a draft) and HubSpot (move the deal forward when a call is booked).'),
  para(integrationResearch.calendly.whyFinalized),

  heading('Why these three together — not just one', HeadingLevel.HEADING_2),
  bullet('Gmail alone leaves no structured memory and no closed loop on scheduling.'),
  bullet('HubSpot alone misses the channel where most leads actually arrive.'),
  bullet('Calendly alone does not explain who the person is or what was discussed before the meeting.'),
  para(
    'Together they answer the owner\'s real question: "If someone is interested, can my agent handle it end to end?" That is a clear, defensible reason to include this trio before expanding into payments, support desks, or social platforms.',
  ),

  heading('Conclusion', HeadingLevel.HEADING_2),
  para(
    'Including Gmail, HubSpot, and Calendly is a good idea because they map directly to how business owners already win work — inbox, pipeline, calendar — and they make the agent useful on day one instead of impressive only in a demo.',
  ),

  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 },
    children: [
      new TextRun({
        text: '— End of Report —',
        italics: true,
        size: 20,
        color: '666666',
      }),
    ],
  }),
]

const doc = new Document({
  title: 'Why Include Gmail, HubSpot & Calendly',
  sections: [{ properties: {}, children }],
})

const buffer = await Packer.toBuffer(doc)
fs.writeFileSync(outFile, buffer)
console.log(`Report written to: ${outFile}`)
