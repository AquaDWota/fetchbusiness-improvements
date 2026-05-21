import { useState } from 'react'
import { HelpCircle, Sparkles } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'

const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    description:
      'Generate Instagram posts and pull posts from your profile to train your agent\'s voice.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description:
      'Generate LinkedIn posts and pull posts from your profile to train your agent\'s voice.',
  },
  {
    id: 'x',
    name: 'X',
    description:
      'Generate tweets and pull posts from your profile to train your agent\'s voice.',
  },
]

export default function SocialsLibrary() {
  const { addToast } = useApp()
  const [selected, setSelected] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [generated, setGenerated] = useState('')

  const generate = () => {
    if (!prompt.trim()) {
      addToast('Enter a topic or prompt first', 'error')
      return
    }
    const samples = {
      instagram: `✨ ${prompt}\n\n#smallbusiness #marketing #fetchai`,
      linkedin: `Excited to share: ${prompt}\n\nWhat strategies have worked for your team?`,
      x: `${prompt.slice(0, 200)} — built with @fetchbusiness`,
    }
    setGenerated(samples[selected?.id] || prompt)
    addToast(`${selected?.name} post generated`)
  }

  return (
    <>
      <WorkbenchHeader
        title="Socials Library"
        rightAction={
          <button
            type="button"
            onClick={() => addToast('Social Studio: generate and train on your brand voice', 'info')}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto bg-fetch-bg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Social Studio Content</h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a category to explore workflows designed for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              type="button"
              onClick={() => {
                setSelected(platform)
                setPrompt('')
                setGenerated('')
              }}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 text-left transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-fetch-purple-light text-2xl font-bold text-fetch-purple">
                {platform.name[0]}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{platform.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{platform.description}</p>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={`${selected?.name} — Content Generator`}
        footer={
          <button
            type="button"
            onClick={generate}
            className="flex items-center gap-2 rounded-lg bg-fetch-purple px-4 py-2 text-sm font-medium text-white"
          >
            <Sparkles className="h-4 w-4" />
            Generate post
          </button>
        }
      >
        <div className="space-y-4">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Summer sale announcement for our cafe"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
          />
          {generated && (
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-2 text-xs font-medium uppercase text-gray-400">Preview</p>
              <p className="whitespace-pre-wrap text-sm text-gray-800">{generated}</p>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(generated)
                  addToast('Copied to clipboard')
                }}
                className="mt-3 text-sm font-medium text-fetch-purple hover:underline"
              >
                Copy to clipboard
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
