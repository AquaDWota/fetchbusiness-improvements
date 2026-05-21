import { useState } from 'react'
import { HelpCircle, Coins, Play, Trash2 } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export default function Workflows() {
  const { state, dispatch, addToast } = useApp()
  const [showWf, setShowWf] = useState(false)
  const [showTask, setShowTask] = useState(false)
  const [wfName, setWfName] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskSchedule, setTaskSchedule] = useState('Daily at 9:00 AM')

  const creditPct = (state.credits.used / state.credits.total) * 100
  const activeDay = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

  const createWorkflow = (e) => {
    e.preventDefault()
    if (!wfName.trim()) return
    dispatch({ type: 'ADD_WORKFLOW', payload: { name: wfName.trim() } })
    addToast(`Workflow "${wfName}" created`)
    setWfName('')
    setShowWf(false)
  }

  const createTask = (e) => {
    e.preventDefault()
    if (!taskName.trim()) return
    dispatch({
      type: 'ADD_TASK',
      payload: { name: taskName.trim(), schedule: taskSchedule },
    })
    addToast(`Task "${taskName}" scheduled`)
    setTaskName('')
    setShowTask(false)
  }

  const runWorkflow = (id, name) => {
    if (state.credits.used >= state.credits.total) {
      addToast('No credits remaining', 'error')
      return
    }
    dispatch({ type: 'RUN_WORKFLOW', payload: id })
    addToast(`Ran workflow "${name}"`)
  }

  return (
    <>
      <WorkbenchHeader
        title="Workflows & Tasks"
        rightAction={
          <button
            type="button"
            onClick={() => addToast('Workflows help: automate agent tasks on a schedule', 'info')}
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
              <span className="text-4xl font-bold text-gray-900">{state.workflowRuns}</span>
              {state.workflowRuns > 0 && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  active
                </span>
              )}
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
            <p className="mt-2 text-lg font-bold text-gray-900">
              {state.credits.used} of {state.credits.total} tokens
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-fetch-purple-light">
              <div
                className="h-full rounded-full bg-indigo-900 transition-all"
                style={{ width: `${creditPct}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Active Workflows</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">{state.workflows.length}</p>
          </div>
        </div>

        <div className="mb-8 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="px-4 text-sm font-medium text-gray-500">My Workflows and Tasks</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">My Workflows</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage and run your saved workflow configurations
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowWf(true)}
              className="rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              Create workflow
            </button>
          </div>
          {state.workflows.length === 0 ? (
            <div className="flex min-h-[160px] items-center justify-center rounded-2xl bg-gray-100">
              <p className="text-sm text-gray-500">
                No workflows configured yet. Create your first workflow to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.workflows.map((wf) => (
                <div
                  key={wf.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">{wf.name}</p>
                    <p className="text-xs text-gray-500">{wf.runs} run{wf.runs !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => runWorkflow(wf.id, wf.name)}
                      className="flex items-center gap-1 rounded-lg bg-fetch-purple-light px-3 py-1.5 text-sm font-medium text-fetch-purple hover:bg-indigo-100"
                    >
                      <Play className="h-3.5 w-3.5" />
                      Run
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch({ type: 'DELETE_WORKFLOW', payload: wf.id })
                        addToast(`Deleted "${wf.name}"`)
                      }}
                      className="rounded-lg p-2 text-red-400 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">My Scheduled Tasks</h3>
              <p className="mt-1 text-sm text-gray-500">Manage your saved scheduled tasks</p>
            </div>
            <button
              type="button"
              onClick={() => setShowTask(true)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Schedule task
            </button>
          </div>
          {state.tasks.length === 0 ? (
            <div className="flex min-h-[160px] items-center justify-center rounded-2xl bg-gray-100">
              <p className="text-sm text-gray-500">
                No tasks configured yet. Create your first task to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">{task.name}</p>
                    <p className="text-xs text-gray-500">{task.schedule}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({ type: 'DELETE_TASK', payload: task.id })
                      addToast(`Removed task "${task.name}"`)
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Modal
        open={showWf}
        onClose={() => setShowWf(false)}
        title="Create workflow"
        footer={
          <button type="submit" form="wf-form" className="rounded-lg bg-fetch-purple px-4 py-2 text-sm text-white">
            Create
          </button>
        }
      >
        <form id="wf-form" onSubmit={createWorkflow}>
          <input
            value={wfName}
            onChange={(e) => setWfName(e.target.value)}
            placeholder="Workflow name"
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm"
            required
          />
        </form>
      </Modal>

      <Modal
        open={showTask}
        onClose={() => setShowTask(false)}
        title="Schedule task"
        footer={
          <button type="submit" form="task-form" className="rounded-lg bg-fetch-purple px-4 py-2 text-sm text-white">
            Schedule
          </button>
        }
      >
        <form id="task-form" onSubmit={createTask} className="space-y-4">
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name"
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm"
            required
          />
          <select
            value={taskSchedule}
            onChange={(e) => setTaskSchedule(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm"
          >
            <option>Daily at 9:00 AM</option>
            <option>Weekly on Monday</option>
            <option>Monthly on the 1st</option>
          </select>
        </form>
      </Modal>
    </>
  )
}
