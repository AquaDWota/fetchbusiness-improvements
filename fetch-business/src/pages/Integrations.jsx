import { Link } from 'react-router-dom'
import { Lock, Globe } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import { integrationApps } from '../data/navigation'
import { interoperabilityProtocols } from '../data/governance'

function AppLogo({ name }) {
  const colors = {
    Stripe: 'bg-indigo-600 text-white',
    Square: 'bg-gray-900 text-white',
    Shopify: 'bg-green-600 text-white',
    'Google Calendar': 'bg-blue-500 text-white',
  }
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${colors[name] || 'bg-gray-200'}`}
    >
      {name === 'Stripe' && 'S'}
      {name === 'Square' && '□'}
      {name === 'Shopify' && 'S'}
      {name === 'Google Calendar' && '📅'}
    </div>
  )
}

function Toggle({ enabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        enabled ? 'bg-fetch-purple' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          enabled ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export default function Integrations() {
  return (
    <>
      <WorkbenchHeader title="Integrations" />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Apps</h2>
          <p className="mt-1 text-sm text-gray-500">
            Enable or disable apps for Business AI.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {integrationApps.map((app) => (
              <div
                key={app.name}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <AppLogo name={app.name} />
                  <Toggle enabled={app.enabled} />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{app.name}</h3>
                <p className="text-sm text-gray-500">{app.category}</p>
                <button
                  type="button"
                  className={`mt-4 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                    app.locked
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-fetch-purple-light text-fetch-purple'
                  }`}
                >
                  {app.locked && <Lock className="h-3 w-3" />}
                  {app.locked ? 'Upgrade' : 'Manage'}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Toggle an app to connect your account, or use Manage to configure settings.
          </p>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Protocol bridges</h2>
              <p className="mt-1 text-sm text-gray-500">
                Interoperability beyond the Fetch ecosystem — MCP, A2A, and open standards.
              </p>
            </div>
            <Link
              to="/workbench/trust"
              className="text-sm font-medium text-fetch-purple hover:underline"
            >
              Manage in Trust & Governance
            </Link>
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
