export const demoBusinessAgent = {
  name: 'Business AI',
  handle: '@business-ai.av',
  owner: 'Riverside Marketing Co.',
  status: 'Listed',
}

export const demoSteps = [
  {
    id: 1,
    type: 'user',
    speaker: 'You (via ASI:one)',
    text: 'I run a cafe in Austin and need help with Instagram. Budget around $500/month. Can you find a business agent?',
    delay: 0,
  },
  {
    id: 2,
    type: 'system',
    speaker: 'ASI:one',
    text: 'Searching Fetch Business directory for marketing agents in Austin…',
    delay: 800,
  },
  {
    id: 3,
    type: 'system',
    speaker: 'ASI:one',
    text: 'Found Business AI · Marketing agent · Austin area',
    delay: 1200,
    integration: null,
  },
  {
    id: 4,
    type: 'a2a',
    speaker: 'A2A handshake',
    text: 'Your personal agent → Business AI · budget_max=500, scope=social_marketing',
    delay: 1600,
  },
  {
    id: 5,
    type: 'agent',
    speaker: 'Business AI',
    text: 'Hi! I help cafes grow on Instagram — 3 posts/week, hashtag strategy, and monthly analytics. For Austin cafes I typically start at $450/mo. Want me to send a formal quote?',
    delay: 2200,
    integration: {
      app: 'HubSpot',
      action: 'Contact found: Sarah Chen · New deal "Riverside Cafe" created · Stage: Qualified',
      status: 'success',
    },
  },
  {
    id: 6,
    type: 'user',
    speaker: 'You (via ASI:one)',
    text: 'Yes, and I’d like a quick discovery call this week.',
    delay: 0,
  },
  {
    id: 7,
    type: 'agent',
    speaker: 'Business AI',
    text: 'Here are two times (Austin CT): Tuesday 2:00 PM or Wednesday 10:00 AM. Reply with your pick and I’ll confirm.',
    delay: 1000,
    integration: {
      app: 'Calendly',
      action: 'GET /event_type_available_times · 15-min Discovery Call',
      status: 'success',
    },
  },
  {
    id: 8,
    type: 'user',
    speaker: 'You (via ASI:one)',
    text: 'Tuesday 2pm works.',
    delay: 0,
  },
  {
    id: 9,
    type: 'agent',
    speaker: 'Business AI',
    text: 'You’re booked — Tuesday May 27, 2:00 PM CT. Calendar invite on the way. Your owner will also receive a quote email for approval.',
    delay: 1200,
    integrations: [
      {
        app: 'Calendly',
        action: 'POST /invitees · Event confirmed · Meet link generated',
        status: 'success',
      },
      {
        app: 'Google Calendar',
        action: 'Event synced to Business AI calendar',
        status: 'success',
      },
      {
        app: 'HubSpot',
        action: 'Deal stage → Appointment scheduled · Activity ref a2a-9f2c',
        status: 'success',
      },
    ],
  },
  {
    id: 10,
    type: 'owner',
    speaker: 'Business owner (behind the scenes)',
    text: 'Gmail draft ready for your review — quote + meeting confirmation. Tap Send when ready.',
    delay: 1800,
    integration: {
      app: 'Gmail',
      action: 'Draft created (not auto-sent) · Awaiting owner approval',
      status: 'pending',
    },
  },
]
