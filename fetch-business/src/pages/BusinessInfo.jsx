import { useState, useRef } from 'react'
import { HelpCircle, Plus, FileText, Calendar, Trash2, File } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import { businessInfoTabs } from '../data/navigation'
import { useApp } from '../context/AppContext'

export default function BusinessInfo() {
  const { state, dispatch, addToast } = useApp()
  const [activeTab, setActiveTab] = useState('Documents')
  const [plainText, setPlainText] = useState('')
  const fileRef = useRef(null)

  const upload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const docId = `doc-${Date.now()}`
    dispatch({ type: 'ADD_DOCUMENT', payload: { id: docId, title: file.name } })
    addToast(`Uploading ${file.name}…`)
    setTimeout(() => {
      dispatch({
        type: 'UPDATE_DOCUMENT',
        payload: { id: docId, data: { state: 'Completed' } },
      })
      addToast(`${file.name} processed and added to knowledge base`)
    }, 2000)
    e.target.value = ''
  }

  const deleteDoc = (id, title) => {
    dispatch({ type: 'DELETE_DOCUMENT', payload: id })
    addToast(`Removed ${title}`)
  }

  const savePlainText = () => {
    if (!plainText.trim()) {
      addToast('Enter some text first', 'error')
      return
    }
    dispatch({
      type: 'ADD_DOCUMENT',
      payload: { title: `Plain text — ${plainText.slice(0, 30)}…` },
    })
    setPlainText('')
    addToast('Plain text added to agent memory')
  }

  const copyShare = async () => {
    await navigator.clipboard.writeText(window.location.href)
    addToast('Page link copied', 'info')
  }

  return (
    <>
      <WorkbenchHeader
        title="Business Information"
        rightAction={
          <button
            type="button"
            onClick={copyShare}
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
                <>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={upload}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                  >
                    <Plus className="h-4 w-4" />
                    Upload Document
                  </button>
                </>
              )}
            </div>

            {activeTab === 'Documents' ? (
              state.documents.length === 0 ? (
                <div className="flex min-h-[200px] items-center justify-center text-sm text-gray-500">
                  No documents yet. Upload your first file.
                </div>
              ) : (
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
                    {state.documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-50">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-red-500" />
                            <span className="text-sm font-medium text-gray-900">{doc.title}</span>
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {doc.dateAdded}
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              doc.state === 'Completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {doc.state}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => addToast(`Preview: ${doc.title}`, 'info')}
                              className="text-gray-400 hover:text-gray-600"
                              aria-label="View document"
                            >
                              <File className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteDoc(doc.id, doc.title)}
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
              )
            ) : activeTab === 'Plain Text' ? (
              <div className="space-y-4">
                <textarea
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  rows={8}
                  placeholder="Paste knowledge, FAQs, or policies for your agent…"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
                />
                <button
                  type="button"
                  onClick={savePlainText}
                  className="rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                >
                  Add to memory
                </button>
              </div>
            ) : (
              <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl bg-gray-50 text-sm text-gray-500">
                <p>No {activeTab.toLowerCase()} yet.</p>
                <button
                  type="button"
                  onClick={() => addToast(`${activeTab} setup coming soon`, 'info')}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Configure {activeTab}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
