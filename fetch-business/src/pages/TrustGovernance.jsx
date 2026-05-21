import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck, Sparkles } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import { governanceFrontiers } from '../data/governance'
import { panelMap } from '../components/governance/GovernancePanels'

export default function TrustGovernance() {
  const location = useLocation()
  const initialTab = location.state?.tab || 'fiduciary'
  const [activeId, setActiveId] = useState(initialTab)
  const ActivePanel = panelMap[activeId]
  const activeFrontier = governanceFrontiers.find((f) => f.id === activeId)

  return (
    <>
      <WorkbenchHeader
        title="Trust & Governance"
        rightAction={
          <button
            type="button"
            className="rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Publish policy
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-6 rounded-2xl border border-fetch-purple/20 bg-gradient-to-r from-fetch-purple-light/80 to-white p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fetch-purple text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Agent commerce trust layer</h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-gray-600">
                Ten frontiers for improving how Fetch Business agents interact with consumers:
                fiduciary duty, financial guardrails, auditability, consent, threat detection,
                transparency, arbitration, versioning, intent integrity, and open interoperability.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {governanceFrontiers.map((f, i) => (
              <span
                key={f.id}
                className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm"
              >
                {i + 1}. {f.shortLabel}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <nav className="w-52 shrink-0 space-y-1">
            {governanceFrontiers.map((frontier) => (
              <button
                key={frontier.id}
                type="button"
                onClick={() => setActiveId(frontier.id)}
                className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                  activeId === frontier.id
                    ? 'border border-gray-200 bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:bg-white/60'
                }`}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck
                    className={`h-3.5 w-3.5 shrink-0 ${
                      activeId === frontier.id ? 'text-fetch-purple' : 'text-gray-400'
                    }`}
                  />
                  {frontier.label}
                </span>
                <p className="mt-0.5 line-clamp-2 pl-5 text-xs text-gray-400">
                  {frontier.summary}
                </p>
              </button>
            ))}
          </nav>

          <div className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            {activeFrontier && (
              <p className="mb-6 text-sm text-gray-500">{activeFrontier.summary}</p>
            )}
            {ActivePanel && <ActivePanel />}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Related:{' '}
          <Link to="/workbench/orders" className="text-fetch-purple hover:underline">
            Orders
          </Link>
          {' · '}
          <Link to="/workbench/integrations" className="text-fetch-purple hover:underline">
            Integrations
          </Link>
          {' · '}
          <Link to="/workbench/profile" className="text-fetch-purple hover:underline">
            Profile
          </Link>
        </p>
      </div>
    </>
  )
}
