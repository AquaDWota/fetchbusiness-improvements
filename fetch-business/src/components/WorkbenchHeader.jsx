import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bot, ChevronUp, ChevronDown } from 'lucide-react'

export default function WorkbenchHeader({ title, rightAction }) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-fetch-purple-light">
            <Bot className="h-3.5 w-3.5 text-fetch-purple" />
          </div>
          Business AI
          <div className="flex flex-col -space-y-1">
            <ChevronUp className="h-3 w-3 text-gray-400" />
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        </button>
      </div>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-fetch-navy">
        {title}
      </h1>

      <div className="flex items-center gap-2">{rightAction}</div>
    </header>
  )
}
