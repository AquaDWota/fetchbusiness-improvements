import { useState } from 'react'
import Modal from './Modal'
import { useApp } from '../context/AppContext'

export default function CreateAgentModal({ open, onClose }) {
  const { dispatch, addToast } = useApp()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Business')

  const handleCreate = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      addToast('Agent name is required', 'error')
      return
    }
    dispatch({
      type: 'CREATE_AGENT',
      payload: { name: name.trim(), description: description.trim(), type },
    })
    addToast(`Agent "${name.trim()}" created`)
    setName('')
    setDescription('')
    setType('Business')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Agent"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-agent-form"
            className="rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Create Agent
          </button>
        </>
      }
    >
      <form id="create-agent-form" onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Agent Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. My Store Assistant"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
          >
            <option>Business</option>
            <option>Personal</option>
            <option>Brand</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="What does this agent do?"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-fetch-purple focus:outline-none focus:ring-2 focus:ring-fetch-purple/20"
          />
        </div>
      </form>
    </Modal>
  )
}
