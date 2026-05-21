import WorkbenchHeader from '../components/WorkbenchHeader'

export default function AgentMessages() {
  return (
    <>
      <WorkbenchHeader title="Order Management" />
      <div className="flex flex-1 overflow-hidden p-6">
        <div className="flex flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="w-80 shrink-0 border-r border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900">Chats</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              No channels found for the selected agent or filters. Start a{' '}
              <button type="button" className="font-medium text-fetch-purple hover:underline">
                conversation
              </button>{' '}
              or{' '}
              <button type="button" className="font-medium text-fetch-purple hover:underline">
                share
              </button>{' '}
              it with others.
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center bg-gray-50/50">
            <div className="rounded-full bg-gray-700 px-6 py-2.5 text-sm font-medium text-white">
              No channels yet. Start a new conversation!
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
