import { Link } from 'react-router-dom'
import { Lock, Sparkles } from 'lucide-react'
import Toggle from './Toggle'

export function AppLogo({ app }) {
  const { bg, label, text = 'text-white' } = app.logo
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${bg} ${text}`}
    >
      {label}
    </div>
  )
}

export default function IntegrationCard({ app, enabled, onToggle, onManage }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm ${
        app.finalized ? 'border-fetch-purple/30 ring-1 ring-fetch-purple/10' : 'border-gray-100'
      }`}
    >
      <div className="flex items-start justify-between">
        <AppLogo app={app} />
        <Toggle enabled={enabled} onChange={onToggle} label={app.name} />
      </div>
      {app.finalized && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          <Sparkles className="h-3 w-3" />
          Finalized
        </span>
      )}
      <h3 className="mt-2 font-semibold text-gray-900">{app.name}</h3>
      <p className="text-sm text-gray-500">{app.category}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {app.finalized && app.slug && (
          <Link
            to={`/workbench/integrations/${app.slug}`}
            className="rounded-lg bg-fetch-purple px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700"
          >
            View use case
          </Link>
        )}
        <button
          type="button"
          onClick={onManage}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
            app.locked
              ? 'bg-gray-100 text-gray-500'
              : 'bg-fetch-purple-light text-fetch-purple'
          }`}
        >
          {app.locked && <Lock className="h-3 w-3" />}
          {app.locked ? 'Upgrade' : 'Manage'}
        </button>
      </div>
    </div>
  )
}
