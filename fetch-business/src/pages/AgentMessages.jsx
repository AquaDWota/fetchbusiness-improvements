import { useState } from 'react'
import { Send } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import { useApp } from '../context/AppContext'

export default function AgentMessages() {
  const { state, dispatch, activeAgent, addToast } = useApp()
  const [message, setMessage] = useState('')
  const selected = state.chats.find((c) => c.id === state.selectedChatId)

  const startConversation = () => {
    dispatch({
      type: 'ADD_CHAT',
      payload: { title: `Chat with ${activeAgent?.name || 'agent'}` },
    })
    addToast('New conversation started')
  }

  const share = async () => {
    const url = `${window.location.origin}/workbench/chats`
    await navigator.clipboard.writeText(url)
    addToast('Chat link copied — share with your team', 'info')
  }

  const send = (e) => {
    e.preventDefault()
    if (!message.trim() || !selected) return
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { chatId: selected.id, text: message.trim() },
    })
    setMessage('')
  }

  return (
    <>
      <WorkbenchHeader title="Agent Messages" />
      <div className="flex flex-1 overflow-hidden p-6">
        <div className="flex flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex w-80 shrink-0 flex-col border-r border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900">Chats</h2>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={startConversation}
                  className="text-sm font-medium text-fetch-purple hover:underline"
                >
                  + New conversation
                </button>
                <button
                  type="button"
                  onClick={share}
                  className="text-sm font-medium text-fetch-purple hover:underline"
                >
                  Share
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {state.chats.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">
                  No channels yet. Start a conversation above.
                </p>
              ) : (
                state.chats.map((chat) => (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SELECT_CHAT', payload: chat.id })}
                    className={`mb-1 w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                      chat.id === state.selectedChatId
                        ? 'bg-fetch-purple-light font-medium text-fetch-purple'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {chat.title}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col bg-gray-50/50">
            {selected ? (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selected.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                          m.role === 'user'
                            ? 'bg-fetch-purple text-white'
                            : m.role === 'system'
                              ? 'bg-gray-200 text-gray-600'
                              : 'border border-gray-200 bg-white text-gray-800'
                        }`}
                      >
                        <p>{m.text}</p>
                        <p
                          className={`mt-1 text-[10px] ${
                            m.role === 'user' ? 'text-purple-200' : 'text-gray-400'
                          }`}
                        >
                          {m.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={send} className="border-t border-gray-200 bg-white p-4">
                  <div className="flex gap-2">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message…"
                      className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="rounded-xl bg-fetch-purple p-2.5 text-white hover:bg-violet-700 disabled:opacity-50"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="rounded-full bg-gray-700 px-6 py-2.5 text-sm font-medium text-white">
                  No channels yet. Start a new conversation!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
