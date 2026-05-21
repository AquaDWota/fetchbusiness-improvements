import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { getDefaultIntegrations } from '../data/integrations'

const STORAGE_KEY = 'fetch-business-state'

const defaultProfile = {
  name: 'Business AI',
  agentType: 'Business Owner',
  location: '',
  website: '',
  handle: 'business-ai-14fa58d2',
  description:
    "I'm a marketing assistant that helps small businesses create engaging social media content, plan campaigns, and track performance. I can write posts, suggest hashtags, and provide analytics insights to grow your online presence.",
}

const initialState = {
  agents: [
    {
      id: 'code4all',
      name: 'Code4All',
      description: 'I do freelance coding for independent projects.',
      type: 'Business',
    },
  ],
  activeAgentId: 'code4all',
  profiles: { code4all: { ...defaultProfile } },
  documents: [
    {
      id: 'doc-1',
      title: 'Saini_Rahul_Resume.pdf',
      dateAdded: 'May 19th, 2026',
      state: 'Completed',
    },
  ],
  orders: [],
  claimAgents: [
    { id: 'fetch-ai', name: 'Fetch.ai', status: 'pending' },
    { id: 'fetch-il-12', name: 'Fetch IL 12', status: 'pending' },
    { id: 'fetch-il-13', name: 'Fetch IL 13', status: 'pending' },
    { id: 'fetch-il-3', name: 'Fetch IL 3', status: 'in-progress' },
    { id: 'fetch-il-8', name: 'Fetch IL 8', status: 'claimable' },
  ],
  workflows: [],
  tasks: [],
  chats: [],
  selectedChatId: null,
  integrations: getDefaultIntegrations(),
  credits: { used: 2, total: 50 },
  workflowRuns: 1,
  toasts: [],
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    return {
      ...initialState,
      ...parsed,
      toasts: [],
      integrations: { ...getDefaultIntegrations(), ...parsed.integrations },
    }
  } catch {
    return initialState
  }
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_AGENT': {
      const id = `agent-${Date.now()}`
      const profile = {
        name: action.payload.name,
        agentType: action.payload.type || 'Business Owner',
        location: '',
        website: '',
        handle: `${action.payload.name.toLowerCase().replace(/\s+/g, '-')}-${id.slice(-6)}`,
        description: action.payload.description || '',
      }
      return {
        ...state,
        agents: [
          ...state.agents,
          {
            id,
            name: action.payload.name,
            description: action.payload.description,
            type: action.payload.type || 'Business',
          },
        ],
        profiles: { ...state.profiles, [id]: profile },
        activeAgentId: id,
      }
    }
    case 'SELECT_AGENT':
      return { ...state, activeAgentId: action.payload }
    case 'UPDATE_PROFILE': {
      const agentId = action.payload.agentId || state.activeAgentId
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [agentId]: { ...state.profiles[agentId], ...action.payload.data },
        },
      }
    }
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [
          {
            id: action.payload.id || `doc-${Date.now()}`,
            title: action.payload.title,
            dateAdded: formatDate(),
            state: action.payload.state || 'Processing',
          },
          ...state.documents,
        ],
      }
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map((d) =>
          d.id === action.payload.id ? { ...d, ...action.payload.data } : d,
        ),
      }
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter((d) => d.id !== action.payload),
      }
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] }
    case 'UPDATE_CLAIM':
      return {
        ...state,
        claimAgents: state.claimAgents.map((a) =>
          a.id === action.payload.id ? { ...a, status: action.payload.status } : a,
        ),
      }
    case 'ADD_WORKFLOW':
      return {
        ...state,
        workflows: [
          ...state.workflows,
          { id: `wf-${Date.now()}`, name: action.payload.name, runs: 0 },
        ],
      }
    case 'DELETE_WORKFLOW':
      return {
        ...state,
        workflows: state.workflows.filter((w) => w.id !== action.payload),
      }
    case 'RUN_WORKFLOW':
      return {
        ...state,
        workflows: state.workflows.map((w) =>
          w.id === action.payload ? { ...w, runs: w.runs + 1 } : w,
        ),
        workflowRuns: state.workflowRuns + 1,
        credits: { ...state.credits, used: Math.min(state.credits.used + 1, state.credits.total) },
      }
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: `task-${Date.now()}`,
            name: action.payload.name,
            schedule: action.payload.schedule,
          },
        ],
      }
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) }
    case 'ADD_CHAT': {
      const chat = {
        id: `chat-${Date.now()}`,
        title: action.payload.title,
        messages: [
          {
            id: 'm1',
            role: 'system',
            text: 'Conversation started. Your agent is ready to respond.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      }
      return {
        ...state,
        chats: [chat, ...state.chats],
        selectedChatId: chat.id,
      }
    }
    case 'SELECT_CHAT':
      return { ...state, selectedChatId: action.payload }
    case 'ADD_MESSAGE': {
      const reply = {
        id: `m-${Date.now()}`,
        role: 'agent',
        text: `Thanks for your message. Business AI received: "${action.payload.text.slice(0, 80)}${action.payload.text.length > 80 ? '…' : ''}"`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      return {
        ...state,
        chats: state.chats.map((c) =>
          c.id === action.payload.chatId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    id: `m-user-${Date.now()}`,
                    role: 'user',
                    text: action.payload.text,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                  reply,
                ],
              }
            : c,
        ),
      }
    }
    case 'TOGGLE_INTEGRATION':
      return {
        ...state,
        integrations: {
          ...state.integrations,
          [action.payload]: !state.integrations[action.payload],
        },
      }
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { id: Date.now(), ...action.payload }],
      }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) }
    case 'HYDRATE':
      return { ...state, ...action.payload, toasts: [] }
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    const { toasts, ...persist } = state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist))
  }, [state])

  const activeAgent = state.agents.find((a) => a.id === state.activeAgentId) || state.agents[0]
  const activeProfile = state.profiles[state.activeAgentId] || defaultProfile

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } })
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3500)
  }, [])

  const value = {
    state,
    dispatch,
    activeAgent,
    activeProfile,
    addToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
