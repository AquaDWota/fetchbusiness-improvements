import { HelpCircle, Coins } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const activeDay = 1

export default function Workflows() {
  return (
    <>
      <WorkbenchHeader
        title="Workflows & Tasks"
        rightAction={
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Runs this Week</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">1</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                100%
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-1">
              {weekDays.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 rounded-sm ${
                      i === activeDay ? 'h-10 bg-indigo-900' : 'h-4 bg-gray-200'
                    }`}
                  />
                  <span className="text-[10px] text-gray-400">{day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-500">Used Credits</p>
            </div>
            <p className="mt-2 text-lg font-bold text-gray-900">2 of 50 tokens</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-fetch-purple-light">
              <div className="h-full w-[4%] rounded-full bg-indigo-900" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Active Workflows</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">0</p>
          </div>
        </div>

        <div className="mb-8 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="px-4 text-sm font-medium text-gray-500">
            My Workflows and Tasks
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900">My Workflows</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage and run your saved workflow configurations
          </p>
          <div className="mt-4 flex min-h-[160px] items-center justify-center rounded-2xl bg-gray-100">
            <p className="text-sm text-gray-500">
              No workflows configured yet. Create your first workflow to get started.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900">My Scheduled Tasks</h3>
          <p className="mt-1 text-sm text-gray-500">Manage your saved scheduled tasks</p>
          <div className="mt-4 flex min-h-[160px] items-center justify-center rounded-2xl bg-gray-100">
            <p className="text-sm text-gray-500">
              No tasks configured yet. Create your first task to get started.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
