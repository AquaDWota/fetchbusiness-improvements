import { Search, RefreshCw } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'

const statusFilters = [
  { label: 'All', active: true, style: 'bg-gray-800 text-white' },
  { label: 'Pending', style: 'border border-orange-400 text-orange-500' },
  { label: 'Confirmed', style: 'border border-indigo-400 text-indigo-500' },
  { label: 'Cancelled', style: 'border border-red-400 text-red-500' },
  { label: 'Completed', style: 'border border-green-500 text-green-600' },
  { label: 'Rejected', style: 'border border-red-800 text-red-800' },
]

export default function Orders() {
  return (
    <>
      <WorkbenchHeader
        title="Orders"
        rightAction={
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {statusFilters.map(({ label, active, style }) => (
            <button
              key={label}
              type="button"
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${style} ${
                !active ? 'bg-white' : ''
              }`}
            >
              {label}
            </button>
          ))}
          <div className="relative ml-auto min-w-[240px] flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search orders by notes..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
            />
          </div>
        </div>

        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-gray-100">
          <h3 className="text-lg font-bold text-gray-900">No Orders Found</h3>
          <p className="mt-2 text-sm text-gray-500">This agent has no orders yet</p>
        </div>
      </div>
    </>
  )
}
