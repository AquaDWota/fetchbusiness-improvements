import { NavLink } from 'react-router-dom'
import { LayoutGrid, PanelLeftClose } from 'lucide-react'
import { navItems, bottomNavItems } from '../data/navigation'

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-fetch-sidebar">
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-fetch-purple" strokeWidth={2} />
          <span className="text-sm font-bold tracking-tight text-gray-900">
            fetch <span className="font-semibold">business</span>
          </span>
        </div>
        <button
          type="button"
          className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-fetch-purple shadow-sm'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`h-4 w-4 shrink-0 ${isActive ? 'text-fetch-purple' : 'text-gray-500'}`}
                  strokeWidth={2}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 px-3 py-4">
        <div className="mb-3 flex items-center gap-3 px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fetch-purple text-sm font-semibold text-white">
            R
          </div>
          <span className="text-sm font-medium text-gray-900">Rahul Saini</span>
        </div>
        {bottomNavItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white/60 hover:text-gray-900"
          >
            <Icon className="h-4 w-4 text-gray-500" strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
