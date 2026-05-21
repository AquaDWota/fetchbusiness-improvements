import { HelpCircle } from 'lucide-react'
import WorkbenchHeader from '../components/WorkbenchHeader'

const platforms = [
  {
    name: 'Instagram',
    description:
      'Generate Instagram posts and pull posts from your profile to train your agent\'s voice.',
  },
  {
    name: 'LinkedIn',
    description:
      'Generate LinkedIn posts and pull posts from your profile to train your agent\'s voice.',
  },
  {
    name: 'X',
    description:
      'Generate tweets and pull posts from your profile to train your agent\'s voice.',
  },
]

export default function SocialsLibrary() {
  return (
    <>
      <WorkbenchHeader
        title="Socials Library"
        rightAction={
          <button
            type="button"
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
              key={platform.name}
              type="button"
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 text-left transition-shadow hover:shadow-md"
            >
              <div className="mb-6 h-16 w-16 rounded-xl bg-gray-50" />
              <h3 className="text-lg font-bold text-gray-900">{platform.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {platform.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
