import { useState } from 'react'
import { HelpCircle, Plus, FileText, Calendar, Trash2, File } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import { businessInfoTabs, documents } from '../data/navigation'

export default function BusinessInfo() {
  const [activeTab, setActiveTab] = useState('Documents')

  return (
    <>
      <WorkbenchHeader
        title="Business Information"
        rightAction={
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Share
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
          <p className="mt-2 text-sm text-gray-600">
            Build your agent&apos;s memory with the tools and data sources you need.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">
            Connecting websites, documents, and other sources creates a knowledge foundation
            for smarter agent interactions. Upload files, scan websites, or add plain text to
            give your agent the context it needs.
          </p>
        </div>

        <div className="flex gap-8">
          <nav className="w-48 shrink-0 space-y-1">
            {businessInfoTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'border border-gray-200 bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:bg-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{activeTab}</h3>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </div>
              {activeTab === 'Documents' && (
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                >
                  <Plus className="h-4 w-4" />
                  Upload Document
                </button>
              )}
            </div>

            {activeTab === 'Documents' ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    <th className="pb-3 pr-4">Document Title</th>
                    <th className="pb-3 pr-4">Date Added</th>
                    <th className="pb-3 pr-4">State</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.title} className="border-b border-gray-50">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-red-500" />
                          <span className="text-sm font-medium text-gray-900">
                            {doc.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {doc.dateAdded}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          {doc.state}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="View document"
                          >
                            <File className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="text-red-400 hover:text-red-600"
                            aria-label="Delete document"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-500">
                No {activeTab.toLowerCase()} yet. Add content to build your agent&apos;s
                knowledge.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
