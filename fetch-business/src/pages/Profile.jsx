import { Info, FileText, Bot, Pencil, ChevronDown } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'

export default function Profile() {
  return (
    <>
      <WorkbenchHeader
        title="Agent Management"
        rightAction={
          <>
            <button
              type="button"
              className="rounded-lg bg-fetch-purple-dark px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              + New
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Share
            </button>
          </>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your agent&apos;s profile information.
          </p>
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
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-fetch-purple-dark text-white shadow-md"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Agent Name
              </label>
              <input
                type="text"
                defaultValue="Business AI"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Identify Type of Agent
              </label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20">
                  <option>Business Owner</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Agent Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your Location..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
                />
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Website (Optional)
              </label>
              <input
                type="url"
                placeholder="https://yourwebsite.com"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Agent Handle
            </label>
            <input
              type="text"
              defaultValue="business-ai-14fa58d2"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
            />
            <p className="mt-2 text-xs text-gray-500">
              Optional: Custom handle for your agent (e.g. &apos;my-agent-handle&apos; for
              @my-agent-handle.av). Must be lowercase letters, numbers, hyphens, or
              underscores only.
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
            defaultValue="I'm a marketing assistant that helps small businesses create engaging social media content, plan campaigns, and track performance. I can write posts, suggest hashtags, and provide analytics insights to grow your online presence."
            className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-700 focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
          />
        </div>
      </div>
    </>
  )
}
