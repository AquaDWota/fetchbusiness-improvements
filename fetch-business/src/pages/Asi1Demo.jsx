import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Send,
  Bot,
  Bell,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sun,
  Settings,
  Brain,
  Mic,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Flame,
  Flag,
  Copy,
  Share2,
  Volume2,
  Play,
  RotateCcw,
  Activity,
  Mail,
  Calendar,
  Database,
  ExternalLink,
  PanelRightOpen,
  PanelRightClose,
  FolderKanban,
  Users,
  MessageSquare,
} from 'lucide-react'
import { demoSteps, demoBusinessAgent } from '../data/asi1DemoScenario'

const ASI_GREEN = '#3DDC84'
const ASI_BG = '#141416'
const ASI_SIDEBAR = '#0f0f11'
const ASI_SURFACE = '#1c1c1f'
const ASI_BORDER = '#2a2a2e'

const appIcons = {
  HubSpot: Database,
  Gmail: Mail,
  Calendly: Calendar,
  'Google Calendar': Calendar,
}

const sidebarChats = [
  { id: 'demo', title: 'Finding marketing help · Business AI', active: true },
  { id: '1', title: 'London Trip Itinerary...' },
  { id: '2', title: 'ASI1 Workflows Overview...' },
  { id: '3', title: 'Exploring ASI1 Agent Capabilities...' },
]

const suggestionPills = [
  { label: 'Play full demo', action: 'play' },
  { label: `Business AI | ${demoBusinessAgent.handle}`, action: 'play' },
  { label: 'Book discovery call', action: 'play' },
]

function AsiOneLogo() {
  return (
    <div className="grid grid-cols-2 gap-[3px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-[7px] w-[7px] rounded-[2px]"
          style={{ backgroundColor: ASI_GREEN }}
        />
      ))}
    </div>
  )
}

function IntegrationBadge({ item }) {
  const Icon = appIcons[item.app] || Bot
  return (
    <div
      className={`mt-2 flex items-start gap-2 rounded-xl border px-3 py-2 text-xs ${
        item.status === 'pending'
          ? 'border-amber-500/30 bg-amber-500/10 text-amber-100'
          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
      }`}
    >
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
      <div>
        <span className="font-semibold text-white">{item.app}</span>
        <p className="mt-0.5 opacity-80">{item.action}</p>
      </div>
    </div>
  )
}

function ChatBubble({ step }) {
  const isUser = step.type === 'user'
  const isAgent = step.type === 'agent'

  if (step.type === 'a2a') {
    return (
      <div className="flex justify-center py-2">
        <span
          className="rounded-full px-4 py-1.5 text-xs text-zinc-400"
          style={{ backgroundColor: ASI_SURFACE, border: `1px solid ${ASI_BORDER}` }}
        >
          {step.text}
        </span>
      </div>
    )
  }

  if (step.type === 'system') {
    return (
      <div className="py-1">
        <p className="text-center text-xs italic text-zinc-500">{step.text}</p>
      </div>
    )
  }

  if (step.type === 'owner') {
    return null
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black"
          style={{ backgroundColor: ASI_GREEN }}
        >
          {isAgent ? 'B' : 'A'}
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? 'text-right' : ''}`}>
        {!isUser && (
          <p className="mb-1 text-xs font-medium text-zinc-500">{step.speaker}</p>
        )}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser ? 'text-white' : 'text-zinc-200'
          }`}
          style={{
            backgroundColor: isUser ? '#2d4a3e' : ASI_SURFACE,
            border: isUser ? 'none' : `1px solid ${ASI_BORDER}`,
          }}
        >
          <p>{step.text}</p>
          {step.integration && <IntegrationBadge item={step.integration} />}
          {step.integrations?.map((i) => (
            <IntegrationBadge key={i.app + i.action} item={i} />
          ))}
        </div>
        {!isUser && isAgent && (
          <div className="mt-2 flex items-center gap-1 text-zinc-600">
            {[ThumbsUp, ThumbsDown, Heart, Flame, Flag, Copy, Share2, Volume2].map(
              (Icon, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="rounded p-1 hover:bg-white/5 hover:text-zinc-400"
                  aria-label="Reaction"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ),
            )}
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xs font-medium text-white">
          S
        </div>
      )}
    </div>
  )
}

export default function Asi1Demo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [input, setInput] = useState('')
  const [ownerPanelOpen, setOwnerPanelOpen] = useState(true)
  const [pillIndex, setPillIndex] = useState(0)
  const chatRef = useRef(null)
  const visibleSteps = demoSteps.slice(0, visibleCount).filter((s) => s.type !== 'owner')
  const ownerStep = demoSteps.find((s) => s.type === 'owner')
  const showOwnerHint = ownerStep && visibleCount >= ownerStep.id

  const activityLog = demoSteps.slice(0, visibleCount).flatMap((step) => {
    const items = []
    if (step.integration) items.push({ ...step.integration, stepId: step.id })
    if (step.integrations) {
      step.integrations.forEach((i) => items.push({ ...i, stepId: step.id }))
    }
    return items
  })

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [visibleCount])

  useEffect(() => {
    if (!playing || visibleCount >= demoSteps.length) {
      if (visibleCount >= demoSteps.length) setPlaying(false)
      return
    }
    const next = demoSteps[visibleCount]
    const delay = visibleCount === 0 ? 400 : next.delay || 1000
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delay)
    return () => clearTimeout(t)
  }, [playing, visibleCount])

  const startDemo = () => {
    setVisibleCount(0)
    setPlaying(true)
  }

  const reset = () => {
    setPlaying(false)
    setVisibleCount(0)
  }

  const handleSend = () => {
    if (!input.trim()) return
    startDemo()
    setInput('')
  }

  const visiblePills = suggestionPills.slice(pillIndex, pillIndex + 3)

  return (
    <div
      className="flex h-screen overflow-hidden font-sans text-zinc-200"
      style={{ backgroundColor: ASI_BG }}
    >
      {/* Left sidebar — ASI:one */}
      <aside
        className="flex w-[260px] shrink-0 flex-col border-r"
        style={{ backgroundColor: ASI_SIDEBAR, borderColor: ASI_BORDER }}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <AsiOneLogo />
            <span className="text-lg font-semibold text-white">
              ASI<span style={{ color: ASI_GREEN }}>:one</span>
            </span>
          </div>
          <button
            type="button"
            className="relative rounded-lg p-2 text-zinc-400 hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-black"
              style={{ backgroundColor: ASI_GREEN }}
            >
              3
            </span>
          </button>
        </div>

        <div className="mx-3 mb-4 flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-bold text-white">
            SC
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">Sarah Chen</p>
            <p className="text-xs text-zinc-500">Your AI · Home</p>
          </div>
        </div>

        <nav className="space-y-0.5 px-3">
          {['Memory', 'Payments'].map((item) => (
            <button
              key={item}
              type="button"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mx-3 mt-4">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-500"
            style={{ backgroundColor: ASI_SURFACE, border: `1px solid ${ASI_BORDER}` }}
          >
            <Search className="h-4 w-4 shrink-0" />
            <span>Search in chats</span>
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto px-3">
          {[
            { icon: FolderKanban, label: 'Projects', count: 1 },
            { icon: Users, label: 'Group Chats', count: 1 },
            { icon: MessageSquare, label: 'Chats', count: 2 },
          ].map(({ icon: Icon, label, count }) => (
            <div key={label} className="mb-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-zinc-400 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                <span
                  className="rounded-full px-1.5 text-[10px] font-semibold text-black"
                  style={{ backgroundColor: ASI_GREEN }}
                >
                  {count}
                </span>
              </button>
            </div>
          ))}

          <div className="space-y-0.5">
            {sidebarChats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                className={`w-full truncate rounded-xl px-3 py-2.5 text-left text-sm ${
                  chat.active
                    ? 'bg-zinc-800/80 text-white'
                    : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                }`}
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t p-3" style={{ borderColor: ASI_BORDER }}>
          <button
            type="button"
            className="mb-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/5"
          >
            <Sun className="h-4 w-4" />
            Light Mode
          </button>
          <div className="flex items-center gap-2 rounded-xl px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs text-white">
              SC
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">Sarah Chen</p>
              <p className="truncate text-[10px] text-zinc-500">sarah@riversidecafe.com</p>
            </div>
            <Settings className="h-4 w-4 shrink-0 text-zinc-500" />
          </div>
          <Link
            to="/workbench/integrations"
            className="mt-2 block text-center text-[10px] text-zinc-600 hover:text-emerald-400"
          >
            ← Fetch Business (owner)
          </Link>
        </div>
      </aside>

      {/* Main chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex items-center justify-between border-b px-5 py-3"
          style={{ borderColor: ASI_BORDER, backgroundColor: ASI_BG }}
        >
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-zinc-300"
          >
            Finding marketing help · Business AI
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Participants</span>
              <div className="flex -space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#141416] bg-zinc-600 text-[10px] text-white">
                  S
                </div>
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#141416] text-[10px] font-bold text-black"
                  style={{ backgroundColor: ASI_GREEN }}
                >
                  B
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 border-l pl-3" style={{ borderColor: ASI_BORDER }}>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
                title="Reset demo"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={startDemo}
                disabled={playing}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-black disabled:opacity-50"
                style={{ backgroundColor: ASI_GREEN }}
                title="Play demo"
              >
                <Play className="h-3.5 w-3.5" />
                Demo
              </button>
              <button
                type="button"
                onClick={() => setOwnerPanelOpen((o) => !o)}
                className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
                title="Toggle owner view"
              >
                {ownerPanelOpen ? (
                  <PanelRightClose className="h-4 w-4" />
                ) : (
                  <PanelRightOpen className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-6">
          {visibleCount === 0 && (
            <div className="mx-auto max-w-2xl py-16 text-center">
              <p className="text-sm text-zinc-500">
                Ask anything or press{' '}
                <button
                  type="button"
                  onClick={startDemo}
                  className="font-medium hover:underline"
                  style={{ color: ASI_GREEN }}
                >
                  Demo
                </button>{' '}
                to simulate finding {demoBusinessAgent.name} for your cafe.
              </p>
            </div>
          )}
          <div className="mx-auto max-w-3xl space-y-6">
            {visibleSteps.map((step) => (
              <ChatBubble key={step.id} step={step} />
            ))}
            {showOwnerHint && (
              <p className="text-center text-[10px] text-zinc-600">
                (Owner Gmail draft — visible in owner panel only)
              </p>
            )}
          </div>
        </div>

        {/* Suggestion pills */}
        <div className="border-t px-4 py-3" style={{ borderColor: ASI_BORDER }}>
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <button
              type="button"
              onClick={() => setPillIndex((i) => Math.max(0, i - 1))}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black"
              style={{ backgroundColor: ASI_GREEN }}
              aria-label="Previous suggestions"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex flex-1 gap-2 overflow-hidden">
              {visiblePills.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => (pill.action === 'play' ? startDemo() : null)}
                  className="shrink-0 rounded-full border px-4 py-2 text-xs text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-white"
                  style={{
                    backgroundColor: ASI_SURFACE,
                    borderColor: ASI_BORDER,
                  }}
                >
                  {pill.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setPillIndex((i) => Math.min(suggestionPills.length - 3, i + 1))
              }
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black"
              style={{ backgroundColor: ASI_GREEN }}
              aria-label="Next suggestions"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="px-4 pb-4 pt-1"
        >
          <div className="relative mx-auto max-w-3xl">
            <div
              className="rounded-2xl border px-4 py-3 pr-28"
              style={{ backgroundColor: ASI_SURFACE, borderColor: ASI_BORDER }}
            >
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  className="mt-1 rounded-lg p-1 text-zinc-500 hover:bg-white/5"
                  aria-label="Attach"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything or use @handle to reach a user or agent directly..."
                  className="min-h-[44px] flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none"
                />
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full p-2 text-zinc-500 hover:bg-white/5"
                  aria-label="AI mode"
                >
                  <Brain className="h-4 w-4" />
                </button>
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-black"
                  style={{ backgroundColor: ASI_GREEN }}
                >
                  G
                </div>
              </div>
            </div>
            <button
              type="button"
              className="absolute -bottom-1 right-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black shadow-lg"
              style={{ backgroundColor: ASI_GREEN }}
            >
              <Mic className="h-4 w-4" />
              Voice
            </button>
            <button
              type="submit"
              className="absolute bottom-3 left-[calc(100%-7rem)] hidden rounded-lg bg-white/10 p-2 text-white hover:bg-white/15 sm:block"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </main>

      {/* Owner panel — integration activity (hidden from consumer ASI:one UI) */}
      {ownerPanelOpen && (
        <aside
          className="flex w-[300px] shrink-0 flex-col border-l"
          style={{ backgroundColor: ASI_SIDEBAR, borderColor: ASI_BORDER }}
        >
          <div className="border-b px-4 py-3" style={{ borderColor: ASI_BORDER }}>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" style={{ color: ASI_GREEN }} />
              <h2 className="text-sm font-semibold text-white">Owner view</h2>
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-500">
                POC
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Integration activity — invisible on ASI:one
            </p>
          </div>

          <div className="border-b px-4 py-3" style={{ borderColor: ASI_BORDER }}>
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">{demoBusinessAgent.name}</span>
            </div>
            <dl className="mt-2 space-y-1 text-xs text-zinc-500">
              <div className="flex justify-between">
                <dt>Handle</dt>
                <dd className="text-zinc-300">{demoBusinessAgent.handle}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Owner</dt>
                <dd className="text-zinc-300">{demoBusinessAgent.owner}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Directory</dt>
                <dd style={{ color: ASI_GREEN }}>{demoBusinessAgent.status}</dd>
              </div>
            </dl>
            <Link
              to="/workbench/integrations/gmail"
              className="mt-3 flex items-center gap-1 text-xs hover:underline"
              style={{ color: ASI_GREEN }}
            >
              <ExternalLink className="h-3 w-3" />
              Integrations dashboard
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activityLog.length === 0 ? (
              <p className="text-xs text-zinc-600">Activity appears as the demo runs…</p>
            ) : (
              <ul className="space-y-2">
                {activityLog.map((item, i) => {
                  const Icon = appIcons[item.app] || Bot
                  return (
                    <li
                      key={`${item.stepId}-${item.app}-${i}`}
                      className="rounded-xl p-3"
                      style={{ backgroundColor: ASI_SURFACE, border: `1px solid ${ASI_BORDER}` }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-semibold text-white">{item.app}</span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">{item.action}</p>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <p className="border-t p-3 text-center text-[10px] text-zinc-600" style={{ borderColor: ASI_BORDER }}>
            Gmail + HubSpot + Calendly · Not live APIs
          </p>
        </aside>
      )}
    </div>
  )
}
