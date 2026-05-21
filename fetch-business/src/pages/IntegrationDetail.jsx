import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Plug,
  Zap,
  ExternalLink,
} from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import { AppLogo } from '../components/IntegrationCard'
import { integrationResearch, finalizedIntegrationIds } from '../data/integrationResearch'
import { allIntegrationApps } from '../data/integrations'
import { useApp } from '../context/AppContext'
import Toggle from '../components/Toggle'

function StepFlow({ steps }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fetch-purple text-xs font-bold text-white">
            {i + 1}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase text-fetch-purple">{step.actor}</p>
            <p className="mt-0.5 text-sm text-gray-700">{step.action}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function IntegrationDetail() {
  const { slug } = useParams()
  const { state, dispatch, addToast, activeAgent } = useApp()
  const research = integrationResearch[slug]
  const app = allIntegrationApps.find((a) => a.slug === slug)
  const [simulated, setSimulated] = useState(false)

  if (!research || !finalizedIntegrationIds.includes(slug)) {
    return <Navigate to="/workbench/integrations" replace />
  }

  const connected = !!state.integrations[app.name]

  const connect = () => {
    if (!connected) {
      dispatch({ type: 'TOGGLE_INTEGRATION', payload: app.name })
      addToast(`${app.name} connected — agent tools enabled`)
    }
  }

  const runSimulation = () => {
    if (!connected) {
      addToast('Connect the integration first', 'error')
      return
    }
    setSimulated(true)
    addToast(`Agent use case simulated for ${activeAgent?.name}`)
  }

  return (
    <>
      <WorkbenchHeader
        title={research.name}
        rightAction={
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Finalized
            </span>
            <Toggle
              enabled={connected}
              onChange={() => {
                dispatch({ type: 'TOGGLE_INTEGRATION', payload: app.name })
                addToast(
                  state.integrations[app.name]
                    ? `${app.name} disconnected`
                    : `${app.name} connected`,
                )
              }}
              label={`Connect ${app.name}`}
            />
          </div>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <Link
          to="/workbench/integrations"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-fetch-purple hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          All integrations
        </Link>

        <div className="mb-8 flex items-start gap-5 rounded-2xl border border-fetch-purple/20 bg-white p-6 shadow-sm">
          <AppLogo app={app} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{research.name}</h2>
            <p className="mt-1 text-gray-600">{research.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">{research.whyFinalized}</p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Plug className="h-5 w-5 text-fetch-purple" />
              <h3 className="font-semibold text-gray-900">API & integration surface</h3>
            </div>
            <p className="text-sm font-medium text-gray-700">{research.apiSurface.provider}</p>
            <p className="mt-2 text-sm text-gray-500">{research.apiSurface.auth}</p>
            <ul className="mt-4 space-y-2">
              {research.apiSurface.keyEndpoints.map((ep) => (
                <li key={ep} className="font-mono text-xs text-gray-600">
                  • {ep}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
              {research.apiSurface.productionNotes}
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-fetch-purple" />
              <h3 className="font-semibold text-gray-900">What your agent can do</h3>
            </div>
            <ul className="space-y-2">
              {research.agentCapabilities.map((cap) => (
                <li key={cap} className="flex gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                  {cap}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-fetch-purple" />
            <h3 className="text-lg font-semibold text-gray-900">{research.useCase.title}</h3>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-gray-600">{research.useCase.scenario}</p>
          <StepFlow steps={research.useCase.steps} />
          <button
            type="button"
            onClick={runSimulation}
            disabled={!connected}
            className="mt-6 rounded-lg bg-fetch-purple px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            Simulate agent run
          </button>
        </section>

        {slug === 'gmail' && (
          <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Live preview (simulated inbox)</h3>
            {!connected ? (
              <p className="text-sm text-gray-500">Connect Gmail to preview agent inbox tools.</p>
            ) : (
              <>
                <div className="space-y-3">
                  {research.demoInbox.map((thread) => (
                    <div
                      key={thread.id}
                      className={`rounded-xl border p-4 ${
                        thread.priority === 'high' ? 'border-fetch-purple/30 bg-fetch-purple-light/20' : 'border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-medium text-gray-900">{thread.subject}</p>
                        <span className="shrink-0 text-xs text-fetch-purple">{thread.agentStatus}</span>
                      </div>
                      <p className="text-xs text-gray-500">{thread.from}</p>
                      <p className="mt-1 text-sm text-gray-600">{thread.preview}</p>
                    </div>
                  ))}
                </div>
                {simulated && (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="text-xs font-semibold text-green-800">Agent draft created</p>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-gray-800">
                      {research.sampleDraft}
                    </pre>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {slug === 'hubspot' && (
          <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Live preview (simulated pipeline)</h3>
            {!connected ? (
              <p className="text-sm text-gray-500">Connect HubSpot to preview CRM agent actions.</p>
            ) : (
              <div className="space-y-3">
                {research.demoPipeline.map((deal) => (
                  <div key={deal.id} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-900">{deal.name}</p>
                      <span className="rounded-full bg-fetch-purple-light px-2 py-0.5 text-xs font-medium text-fetch-purple">
                        {deal.stage}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {deal.contact} · ${deal.amount}/mo
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{deal.lastActivity}</p>
                  </div>
                ))}
                {simulated && (
                  <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                    ✓ A2A negotiation logged to Riverside Cafe deal · audit ID a2a-7d04
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {slug === 'calendly' && (
          <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Live preview (scheduling API)</h3>
            {!connected ? (
              <p className="text-sm text-gray-500">Connect Calendly to preview agent booking.</p>
            ) : (
              <>
                <div className="mb-4 grid gap-3 sm:grid-cols-2">
                  {research.demoEventTypes.map((et) => (
                    <div key={et.id} className="rounded-xl bg-gray-50 p-4">
                      <p className="font-medium text-gray-900">{et.name}</p>
                      <p className="text-xs text-gray-500">{et.duration}</p>
                      <p className="mt-2 text-sm text-gray-600">{et.availability}</p>
                    </div>
                  ))}
                </div>
                {research.demoBookings.map((b) => (
                  <div key={b.id} className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="font-medium text-gray-900">{b.invitee} — {b.event}</p>
                    <p className="text-sm text-gray-600">{b.time}</p>
                    <p className="text-xs text-gray-500">{b.source}</p>
                  </div>
                ))}
                {simulated && (
                  <p className="mt-3 rounded-lg bg-fetch-purple-light p-3 text-sm text-fetch-purple">
                    ✓ POST /invitees — Tue 2:00 PM booked · synced to Google Calendar & HubSpot
                  </p>
                )}
              </>
            )}
          </section>
        )}

        {!connected && (
          <button
            type="button"
            onClick={connect}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-fetch-purple py-3.5 text-sm font-medium text-white hover:bg-violet-700 sm:w-auto sm:px-8"
          >
            <ExternalLink className="h-4 w-4" />
            Connect {research.name}
          </button>
        )}
      </div>
    </>
  )
}
