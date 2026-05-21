import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Plus, Bot } from 'lucide-react'
import { useApp } from '../context/AppContext'
import CreateAgentModal from '../components/CreateAgentModal'

export default function Home() {
  const { state, dispatch, addToast } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = state.agents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()),
  )

  const openAgent = (id) => {
    dispatch({ type: 'SELECT_AGENT', payload: id })
    navigate('/workbench/profile')
  }

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search agents..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
        />
      </div>

      {filtered.length === 0 && search && (
        <p className="mb-6 text-sm text-gray-500">No agents match &quot;{search}&quot;</p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 transition-colors hover:border-fetch-purple hover:bg-fetch-purple-light/30"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fetch-purple-light">
            <Plus className="h-7 w-7 text-fetch-purple" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold text-gray-900">Create New Agent</span>
          <span className="mt-1 text-sm text-gray-500">Start building your AI agent</span>
        </button>

        {filtered.map((agent) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => openAgent(agent.id)}
            className="flex min-h-[220px] flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fetch-purple">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
              {agent.description || 'No description yet'}
            </p>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400">Type</p>
              <p className="text-sm font-semibold text-gray-900">{agent.type}</p>
            </div>
          </button>
        ))}
      </div>

      <CreateAgentModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  )
}
