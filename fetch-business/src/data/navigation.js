import {
  Home,
  Star,
  Bot,
  Brain,
  Layers,
  ListChecks,
  MessagesSquare,
  ShoppingBag,
  Plug,
  ShieldCheck,
  Settings,
  LogOut,
} from 'lucide-react'

export const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Claim Your Agent', path: '/claim', icon: Star },
  { label: 'Profile & Instructions', path: '/workbench/profile', icon: Bot },
  { label: 'Business Information', path: '/workbench/business-info', icon: Brain },
  { label: 'Socials Library', path: '/workbench/workflows/library', icon: Layers },
  { label: 'Workflows & Tasks', path: '/workbench/workflows', icon: ListChecks },
  { label: 'Agent Messages', path: '/workbench/chats', icon: MessagesSquare },
  { label: 'Orders', path: '/workbench/orders', icon: ShoppingBag },
  { label: 'Trust & Governance', path: '/workbench/trust', icon: ShieldCheck },
  { label: 'Integrations', path: '/workbench/integrations', icon: Plug },
]

export const bottomNavItems = [
  { label: 'Account & Billing', path: '/account', icon: Settings },
  { label: 'Logout', path: '/logout', icon: LogOut },
]

export const claimAgents = [
  { name: 'Fetch.ai', status: 'pending' },
  { name: 'Fetch IL 12', status: 'pending' },
  { name: 'Fetch IL 13', status: 'pending' },
  { name: 'Fetch IL 3', status: 'in-progress' },
  { name: 'Fetch IL 8', status: 'claimable' },
]

export const agents = [
  {
    id: 'code4all',
    name: 'Code4All',
    description: 'I do freelance coding for independent projects.',
    type: 'Business',
    icon: 'robot',
  },
]

export const documents = [
  {
    title: 'Saini_Rahul_Resume.pdf',
    dateAdded: 'May 19th, 2026',
    state: 'Completed',
  },
]

export const businessInfoTabs = [
  'Documents',
  'Website Scans',
  'Research Reports',
  'Plain Text',
  'Fact Check',
]

export const integrationApps = [
  { name: 'Stripe', category: 'Payments', locked: true },
  { name: 'Square', category: 'Orders', locked: true },
  { name: 'Shopify', category: 'E-commerce', locked: true },
  { name: 'Google Calendar', category: 'Google Calendar', locked: false, enabled: true },
]
