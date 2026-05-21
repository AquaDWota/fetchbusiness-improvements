import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, ChevronUp, ChevronDown, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function AgentSelector() {
  const { state, dispatch, activeAgent } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (id) => {
    dispatch({ type: 'SELECT_AGENT', payload: id })
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-fetch-purple-light">
          <Bot className="h-3.5 w-3.5 text-fetch-purple" />
        </div>
        {activeAgent?.name || 'Select agent'}
        <div className="flex flex-col -space-y-1">
          <ChevronUp className="h-3 w-3 text-gray-400" />
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </div>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          {state.agents.map((agent) => (
            <button
              key={agent.id}
              type="button"
              onClick={() => select(agent.id)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{agent.name}</span>
              {agent.id === state.activeAgentId && (
                <Check className="h-4 w-4 text-fetch-purple" />
              )}
            </button>
          ))}
          <hr className="my-1 border-gray-100" />
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              navigate('/')
            }}
            className="w-full px-4 py-2 text-left text-sm text-fetch-purple hover:bg-gray-50"
          >
            Manage agents
          </button>
        </div>
      )}
    </div>
  )
}
