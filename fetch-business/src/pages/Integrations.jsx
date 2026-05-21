import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Globe, Search } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import IntegrationCard from '../components/IntegrationCard'
import { integrationCategories, allIntegrationApps } from '../data/integrations'
import { finalizedIntegrationIds } from '../data/integrationResearch'
import { interoperabilityProtocols } from '../data/integrations'
import { useApp } from '../context/AppContext'

export default function Integrations() {
  const { state, dispatch, addToast } = useApp()
  const [search, setSearch] = useState('')

  const connectedCount = useMemo(
    () => Object.values(state.integrations).filter(Boolean).length,
    [state.integrations],
  )

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return integrationCategories
    return integrationCategories
      .map((cat) => ({
        ...cat,
        apps: cat.apps.filter(
          (app) =>
            app.name.toLowerCase().includes(q) ||
            app.category.toLowerCase().includes(q) ||
            cat.title.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.apps.length > 0)
  }, [search])

  const toggleApp = (app) => {
    if (app.locked) {
      addToast(`${app.name} requires a plan upgrade`, 'info')
      return
    }
    dispatch({ type: 'TOGGLE_INTEGRATION', payload: app.name })
    const next = !state.integrations[app.name]
    addToast(`${app.name} ${next ? 'connected' : 'disconnected'}`)
  }

  return (
    <>
      <WorkbenchHeader title="Integrations" />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Connect your business stack</h2>
            <p className="mt-1 text-sm text-gray-500">
              {connectedCount} app{connectedCount !== 1 ? 's' : ''} connected — enable tools your
              agent can use on your behalf.
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search integrations..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
            />
          </div>
        </div>

        <section className="mb-10 rounded-2xl border border-fetch-purple/25 bg-gradient-to-br from-fetch-purple-light/60 to-white p-6">
          <h3 className="text-lg font-bold text-gray-900">Finalized for your agent</h3>
          <p className="mt-1 text-sm text-gray-600">
            We deep-researched Gmail, HubSpot, and Calendly — full API surface, agent use cases,
            and live previews. Connect and simulate how {connectedCount > 0 ? 'your' : 'an'}{' '}
            agent orchestrates email → CRM → booking.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {finalizedIntegrationIds.map((id) => {
              const app = allIntegrationApps.find((a) => a.slug === id)
              return (
                <Link
                  key={id}
                  to={`/workbench/integrations/${id}`}
                  className="rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                >
                  {app?.name} →
                </Link>
              )
            })}
            <Link
              to="/demo/asi1"
              className="rounded-lg border-2 border-violet-600 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              ASI:one consumer POC →
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            See the MVP from a customer&apos;s perspective: personal agent discovers Business AI,
            negotiates, books a call — with Gmail, HubSpot, and Calendly activity on the side.
          </p>
        </section>

        {filteredCategories.length === 0 ? (
          <p className="text-sm text-gray-500">No integrations match your search.</p>
        ) : (
          filteredCategories.map((category) => (
            <section key={category.id} className="mb-10">
              <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{category.description}</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.apps.map((app) => (
                  <IntegrationCard
                    key={app.name}
                    app={app}
                    enabled={!!state.integrations[app.name]}
                    onToggle={() => toggleApp(app)}
                    onManage={() =>
                      app.locked
                        ? addToast('Upgrade to unlock', 'info')
                        : addToast(`${app.name} settings opened`, 'info')
                    }
                  />
                ))}
              </div>
            </section>
          ))
        )}

        <p className="mb-10 text-xs text-gray-500">
          Toggle an app to connect your account, or use Manage to configure settings. Most
          integrations require a paid plan.
        </p>

        <section className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Protocol bridges</h2>
              <p className="mt-1 text-sm text-gray-500">
                Interoperability beyond the Fetch ecosystem.
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {interoperabilityProtocols.map((protocol) => (
              <div
                key={protocol.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-fetch-purple" />
                    <h3 className="font-semibold text-gray-900">{protocol.name}</h3>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      protocol.status === 'connected'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {protocol.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{protocol.description}</p>
                {protocol.status !== 'connected' && (
                  <button
                    type="button"
                    onClick={() =>
                      addToast(`${protocol.name} bridge configuration opened`, 'info')
                    }
                    className="mt-4 text-sm font-medium text-fetch-purple hover:underline"
                  >
                    Configure bridge
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">OpenAPI Integration</h2>
          <p className="mt-1 text-sm text-gray-500">
            Connect custom APIs and business tools to your agent.
          </p>
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="text-center">
              <h3 className="font-bold text-gray-900">No OpenAPI integrations</h3>
              <p className="mt-2 text-sm text-gray-500">
                Business AI doesn&apos;t have any OpenAPI integrations yet.
              </p>
            </div>
            <button
              type="button"
              onClick={() => addToast('Upgrade required for OpenAPI integrations', 'info')}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-fetch-purple py-3.5 text-sm font-medium text-white hover:bg-violet-700"
            >
              <Lock className="h-4 w-4" />
              Upgrade to create
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
