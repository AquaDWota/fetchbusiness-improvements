import { useState, useMemo } from 'react'
import { Search, RefreshCw, Plus } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'

const statusFilters = ['All', 'Pending', 'Confirmed', 'Cancelled', 'Completed', 'Rejected']

const statusStyles = {
  All: 'bg-gray-800 text-white',
  Pending: 'border border-orange-400 text-orange-500 bg-white',
  Confirmed: 'border border-indigo-400 text-indigo-500 bg-white',
  Cancelled: 'border border-red-400 text-red-500 bg-white',
  Completed: 'border border-green-500 text-green-600 bg-white',
  Rejected: 'border border-red-800 text-red-800 bg-white',
}

export default function Orders() {
  const { state, dispatch, addToast } = useApp()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [notes, setNotes] = useState('')
  const [amount, setAmount] = useState('')

  const filtered = useMemo(() => {
    return state.orders.filter((o) => {
      const matchStatus = filter === 'All' || o.status === filter
      const matchSearch =
        !search || o.notes?.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [state.orders, filter, search])

  const createOrder = (e) => {
    e.preventDefault()
    const value = parseFloat(amount)
    const order = {
      id: `ord-${Date.now()}`,
      notes: notes || 'No notes',
      amount: value,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    dispatch({ type: 'ADD_ORDER', payload: order })
    addToast(`Order created — $${value.toFixed(2)}`)
    setNotes('')
    setAmount('')
    setShowCreate(false)
  }

  return (
    <>
      <WorkbenchHeader
        title="Orders"
        rightAction={
          <>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              <Plus className="mr-1 inline h-4 w-4" />
              New order
            </button>
            <button
              type="button"
              onClick={() => addToast('Orders refreshed', 'info')}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {statusFilters.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setFilter(label)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${statusStyles[label]}`}
            >
              {label}
            </button>
          ))}
          <div className="relative ml-auto min-w-[240px] flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders by notes..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-gray-100">
            <h3 className="text-lg font-bold text-gray-900">No Orders Found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {state.orders.length === 0
                ? 'This agent has no orders yet'
                : 'No orders match your filters'}
            </p>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="mt-4 rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              Create test order
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Notes</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{o.notes}</td>
                    <td className="px-4 py-3">${o.amount?.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium">
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create order"
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="order-form"
              className="rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white"
            >
              Create
            </button>
          </>
        }
      >
        <form id="order-form" onSubmit={createOrder} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Notes</label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm"
              placeholder="Order description"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Amount ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm"
            />
          </div>
        </form>
      </Modal>
    </>
  )
}
