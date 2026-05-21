import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AgentSelector from './AgentSelector'

export default function WorkbenchHeader({ title, rightAction }) {
  const navigate = useNavigate()

  return (
    <header className="relative flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <AgentSelector />
      </div>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-fetch-navy">
        {title}
      </h1>

      <div className="flex items-center gap-2">{rightAction}</div>
    </header>
  )
}
