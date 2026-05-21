import { useState } from 'react'
import { Search, Clock, CheckCircle2, LayoutGrid } from 'lucide-react'
import { useApp } from '../context/AppContext'

function AgentStatus({ agent, onClaim }) {
  if (agent.status === 'pending') {
    return (
      <span className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        Pending Verification
      </span>
    )
  }
  if (agent.status === 'in-progress') {
    return (
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        Claim in Progress
      </span>
    )
  }
  if (agent.status === 'claimed') {
    return (
      <span className="text-sm font-medium text-green-600">Claimed</span>
    )
  }
  return (
    <button
      type="button"
      onClick={() => onClaim(agent.id)}
      className="rounded-lg bg-indigo-100 px-5 py-2 text-sm font-medium text-fetch-purple hover:bg-indigo-200"
    >
      Claim
    </button>
  )
}

export default function ClaimAgent() {
  const { state, dispatch, addToast } = useApp()
  const [brandSearch, setBrandSearch] = useState('')

  const filtered = state.claimAgents.filter((a) =>
    a.name.toLowerCase().includes(brandSearch.toLowerCase()),
  )

  const claim = (id) => {
    dispatch({ type: 'UPDATE_CLAIM', payload: { id, status: 'in-progress' } })
    addToast('Claim started — verification in progress')
    setTimeout(() => {
      dispatch({ type: 'UPDATE_CLAIM', payload: { id, status: 'claimed' } })
      addToast('Agent claimed successfully!')
    }, 2500)
  }

  const createNew = () => {
    addToast('Redirecting to agent creation…', 'info')
    window.location.href = '/'
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-center text-3xl font-bold text-fetch-navy">
        Claim Your Business Agent
      </h1>
      <p className="mt-2 text-center text-sm text-gray-500">
        Agents associated with fetch.ai
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <span className="text-sm text-gray-600">Can&apos;t find your agent?</span>
        <button
          type="button"
          onClick={createNew}
          className="rounded-lg bg-fetch-purple px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
        >
          Create a New Agent
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {filtered.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center justify-between rounded-xl bg-gray-50 px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200">
                <LayoutGrid className="h-5 w-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-900">{agent.name}</span>
            </div>
            <AgentStatus agent={agent} onClaim={claim} />
          </div>
        ))}
      </div>

      <hr className="my-12 border-gray-200" />

      <h2 className="text-center text-2xl font-bold text-fetch-navy">
        Explore Brand Agents
      </h2>
      <p className="mt-2 text-center text-sm text-gray-500">
        Search and discover agents from popular brands
      </p>

      <div className="relative mx-auto mt-6 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          placeholder="Search for brand agents..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
        />
      </div>
      {brandSearch && (
        <p className="mt-3 text-center text-sm text-gray-500">
          {filtered.length} agent{filtered.length !== 1 ? 's' : ''} match your search
        </p>
      )}
    </div>
  )
}
