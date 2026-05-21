import { Link } from 'react-router-dom'
import { Search, Plus, Bot } from 'lucide-react'
import { agents } from '../data/navigation'

export default function Home() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Agents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Select an agent to view its dashboard and manage settings
        </p>
      </div>

      <div className="relative mb-8 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search agents..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <button
          type="button"
          className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 transition-colors hover:border-fetch-purple hover:bg-fetch-purple-light/30"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fetch-purple-light">
            <Plus className="h-7 w-7 text-fetch-purple" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold text-gray-900">Create New Agent</span>
          <span className="mt-1 text-sm text-gray-500">Start building your AI agent</span>
        </button>

        {agents.map((agent) => (
          <Link
            key={agent.id}
            to="/workbench/profile"
            className="flex min-h-[220px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fetch-purple">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
              {agent.description}
            </p>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400">Type</p>
              <p className="text-sm font-semibold text-gray-900">{agent.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
