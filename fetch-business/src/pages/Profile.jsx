import { useState, useEffect } from 'react'
import { Info, FileText, Bot, Pencil, ChevronDown, Save } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { state, dispatch, activeProfile, activeAgent, addToast } = useApp()
  const [form, setForm] = useState(activeProfile)

  useEffect(() => {
    setForm(activeProfile)
  }, [state.activeAgentId, activeProfile])

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const save = () => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { agentId: state.activeAgentId, data: form },
    })
    addToast('Profile saved successfully')
  }

  const copyShareLink = async () => {
    const url = `${window.location.origin}/agent/${form.handle}`
    await navigator.clipboard.writeText(url)
    addToast('Agent share link copied to clipboard', 'info')
  }

  return (
    <>
      <WorkbenchHeader
        title="Agent Management"
        rightAction={
          <>
            <button
              type="button"
              onClick={() => addToast('Duplicate agent coming soon', 'info')}
              className="rounded-lg bg-fetch-purple-dark px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              + New
            </button>
            <button
              type="button"
              onClick={copyShareLink}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Share
            </button>
          </>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update {activeAgent?.name}&apos;s profile information.
            </p>
          </div>
          <button
            type="button"
            onClick={save}
            className="flex items-center gap-2 rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <Info className="h-4 w-4 text-gray-500" />
            <h3 className="font-semibold text-gray-900">Basic Information</h3>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-fetch-purple-light">
                <Bot className="h-14 w-14 text-fetch-purple-dark" />
              </div>
              <button
                type="button"
                onClick={() => addToast('Avatar upload coming soon', 'info')}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-fetch-purple-dark text-white shadow-md"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Agent Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Identify Type of Agent
              </label>
              <div className="relative">
                <select
                  value={form.agentType}
                  onChange={(e) => update('agentType', e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
                >
                  <option>Business Owner</option>
                  <option>Brand Representative</option>
                  <option>Service Provider</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Agent Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="Search your Location..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Website (Optional)
              </label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => update('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Agent Handle</label>
            <input
              type="text"
              value={form.handle}
              onChange={(e) => update('handle', e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
            />
            <p className="mt-2 text-xs text-gray-500">
              Lowercase letters, numbers, hyphens, or underscores only.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <h3 className="font-semibold text-gray-900">Business Description</h3>
          </div>
          <textarea
            rows={5}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-700 focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
          />
        </div>

      </div>
    </>
  )
}
