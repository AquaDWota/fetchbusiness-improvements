import { Link, Outlet } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'

export default function ClaimLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between bg-fetch-navy px-8 py-4">
        <Link to="/" className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-white" strokeWidth={2} />
          <span className="text-lg font-bold">
            <span className="text-white">fetch</span>{' '}
            <span className="text-indigo-300">business</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            <span className="grid grid-cols-2 gap-0.5">
              <span className="h-1.5 w-1.5 rounded-sm bg-gray-800" />
              <span className="h-1.5 w-1.5 rounded-sm bg-gray-800" />
              <span className="h-1.5 w-1.5 rounded-sm bg-gray-800" />
              <span className="h-1.5 w-1.5 rounded-sm bg-gray-800" />
            </span>
            ASI:one
          </button>
          <button
            type="button"
            className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
