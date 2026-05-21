import { useState } from 'react'
import {
  Shield,
  DollarSign,
  FileSearch,
  Lock,
  AlertTriangle,
  Scale,
  GitBranch,
  Target,
  Globe,
  CheckCircle2,
  ExternalLink,
  Fingerprint,
} from 'lucide-react'
import Toggle from './Toggle'
import {
  fiduciaryModes,
  financialTiers,
  sampleAuditLogs,
  consentDataTypes,
  threatAlerts,
  behavioralVersions,
  interoperabilityProtocols,
  disclosureFields,
} from '../../data/governance'

function PanelHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-fetch-purple" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
    </div>
  )
}

export function FiduciaryPanel() {
  const [mode, setMode] = useState('balanced')

  return (
    <div>
      <PanelHeader
        icon={Shield}
        title="Agent fiduciary standards"
        description="Distinguish when your agent acts for the brand versus on behalf of the user. Verified should mean accountable—not only self-interested."
      />
      <div className="space-y-3">
        {fiduciaryModes.map((m) => (
          <label
            key={m.id}
            className={`flex cursor-pointer gap-4 rounded-xl border p-4 transition-colors ${
              mode === m.id
                ? 'border-fetch-purple bg-fetch-purple-light/40'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="fiduciary"
              checked={mode === m.id}
              onChange={() => setMode(m.id)}
              className="mt-1 accent-fetch-purple"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{m.label}</span>
                {m.recommended && (
                  <span className="rounded-full bg-fetch-purple px-2 py-0.5 text-xs font-medium text-white">
                    Recommended
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">{m.description}</p>
            </div>
          </label>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Consumer agents will see your fiduciary mode in machine-readable agent metadata during A2A
        handshakes.
      </p>
    </div>
  )
}

export function FinancialPanel() {
  const [tiers, setTiers] = useState(financialTiers)
  const [microLimit, setMicroLimit] = useState(50)

  return (
    <div>
      <PanelHeader
        icon={DollarSign}
        title="Graduated financial authority"
        description="Sudo-style escalation: read-only → soft holds → micro-purchases → explicit approval for large spends. Prevents auto-commit scenarios like an unconfirmed $687 charge."
      />
      <div className="space-y-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">{tier.label}</p>
              <p className="mt-1 text-sm text-gray-500">{tier.description}</p>
              {tier.id === 'micro' && (
                <div className="mt-3 flex items-center gap-3">
                  <label className="text-sm text-gray-600">Threshold: $</label>
                  <input
                    type="number"
                    value={microLimit}
                    onChange={(e) => setMicroLimit(Number(e.target.value))}
                    className="w-24 rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
                  />
                </div>
              )}
            </div>
            <Toggle
              enabled={tiers.find((t) => t.id === tier.id)?.enabled ?? tier.enabled}
              onChange={(v) =>
                setTiers((prev) =>
                  prev.map((t) => (t.id === tier.id ? { ...t, enabled: v } : t)),
                )
              }
              label={tier.label}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AuditPanel() {
  return (
    <div>
      <PanelHeader
        icon={FileSearch}
        title="Verifiable audit trails"
        description="Every agent-to-agent transaction produces a tamper-proof, human-readable log. Users can replay why $165 was spent—not just see a vague receipt."
      />
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">Cryptographic signing enabled</span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
          <CheckCircle2 className="h-4 w-4" />
          Active
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Parties</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Proof</th>
            </tr>
          </thead>
          <tbody>
            {sampleAuditLogs.map((log) => (
              <tr key={log.id} className="border-t border-gray-100 bg-white">
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-400">{log.timestamp}</p>
                </td>
                <td className="px-4 py-4 text-gray-600">{log.parties}</td>
                <td className="px-4 py-4 font-medium text-gray-900">{log.amount}</td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-fetch-purple hover:underline"
                  >
                    <Fingerprint className="h-4 w-4" />
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="mt-4 text-sm font-medium text-fetch-purple hover:underline"
      >
        Export full negotiation replay (JSON-LD + signatures)
      </button>
    </div>
  )
}

export function ConsentPanel() {
  const [settings, setSettings] = useState(
    Object.fromEntries(
      consentDataTypes.map((d) => [d.id, { share: d.id !== 'purchase-history', retention: d.defaultRetention }]),
    ),
  )

  return (
    <div>
      <PanelHeader
        icon={Lock}
        title="Consent-aware data sharing"
        description="Bake consent into A2A flows—not bolt it on later. Control what brand agents may infer and retain after each interaction."
      />
      <div className="space-y-3">
        {consentDataTypes.map((dtype) => (
          <div
            key={dtype.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4"
          >
            <div>
              <p className="font-medium text-gray-900">{dtype.label}</p>
              <p className="text-xs text-gray-400">A2A consent scope</p>
            </div>
            <div className="flex items-center gap-4">
              <Toggle
                enabled={settings[dtype.id]?.share}
                onChange={(v) =>
                  setSettings((s) => ({ ...s, [dtype.id]: { ...s[dtype.id], share: v } }))
                }
                label={`Share ${dtype.label}`}
              />
              <select
                value={settings[dtype.id]?.retention}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    [dtype.id]: { ...s[dtype.id], retention: e.target.value },
                  }))
                }
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
                disabled={!settings[dtype.id]?.share}
              >
                <option value="none">Do not retain</option>
                <option value="session">Session only</option>
                <option value="30d">30 days</option>
                <option value="90d">90 days</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdversarialPanel() {
  const [autoQuarantine, setAutoQuarantine] = useState(true)

  return (
    <div>
      <PanelHeader
        icon={AlertTriangle}
        title="Adversarial agent detection"
        description="Move beyond a passive directory. Flag agents that over-solicit data, deviate from capabilities, or show suspicious conversion patterns."
      />
      <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <div>
          <p className="font-medium text-gray-900">Automatic quarantine</p>
          <p className="text-sm text-gray-500">
            Isolate agents that breach behavioral baselines before user complaints
          </p>
        </div>
        <Toggle enabled={autoQuarantine} onChange={setAutoQuarantine} label="Auto quarantine" />
      </div>
      <div className="space-y-3">
        {threatAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-xl border p-4 ${
              alert.severity === 'low'
                ? 'border-amber-200 bg-amber-50'
                : 'border-green-200 bg-green-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{alert.agent}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                  alert.status === 'clear'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {alert.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DisclosurePanel() {
  const [fields, setFields] = useState(disclosureFields)

  return (
    <div>
      <PanelHeader
        icon={Scale}
        title="Conflict-of-interest disclosure"
        description="Make sponsorship and affiliate relationships machine-readable—like regulated human commerce, but native to agentic interactions."
      />
      <div className="space-y-3">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
          >
            <span className="font-medium text-gray-900">{field.label}</span>
            <Toggle
              enabled={fields.find((f) => f.id === field.id)?.enabled ?? field.enabled}
              onChange={(v) =>
                setFields((prev) =>
                  prev.map((f) => (f.id === field.id ? { ...f, enabled: v } : f)),
                )
              }
              label={field.label}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-gray-50 p-4 font-mono text-xs text-gray-600">
        {`{"disclosures":["affiliate","sponsored","partnership"],"agent":"business-ai"}`}
      </div>
    </div>
  )
}

export function ArbitrationPanel() {
  return (
    <div>
      <PanelHeader
        icon={Scale}
        title="Cross-agent arbitration protocol"
        description="When agents disagree on availability, pricing, or payments—a neutral layer reviews signed logs without a human support ticket."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="rounded-xl border border-fetch-purple bg-fetch-purple-light/30 p-4">
          <input type="radio" name="arbitration" defaultChecked className="accent-fetch-purple" />
          <p className="mt-2 font-medium text-gray-900">Fetch neutral arbiter</p>
          <p className="mt-1 text-sm text-gray-500">Platform-appointed third-party agent reviews A2A logs</p>
        </label>
        <label className="rounded-xl border border-gray-200 bg-white p-4">
          <input type="radio" name="arbitration" className="accent-fetch-purple" />
          <p className="mt-2 font-medium text-gray-900">DAO-style tribunal</p>
          <p className="mt-1 text-sm text-gray-500">Decentralized panel with stake-weighted adjudication</p>
        </label>
      </div>
      <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
        <p className="text-sm font-medium text-gray-900">No open disputes</p>
        <p className="mt-1 text-sm text-gray-500">
          Disputes appear here with full signed negotiation replay attached
        </p>
      </div>
    </div>
  )
}

export function VersioningPanel() {
  const [pinned, setPinned] = useState('v2.3.0')

  return (
    <div>
      <PanelHeader
        icon={GitBranch}
        title="Agent versioning & behavioral pinning"
        description="Publish versioned behavioral contracts. Consumers can pin a policy version or receive alerts when decision-making changes materially."
      />
      <div className="space-y-3">
        {behavioralVersions.map((v) => (
          <div
            key={v.version}
            className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-gray-900">{v.version}</span>
                {v.status === 'current' && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    Current
                  </span>
                )}
                {pinned === v.version && (
                  <span className="rounded-full bg-fetch-purple-light px-2 py-0.5 text-xs text-fetch-purple">
                    Pinned by users
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">{v.changes}</p>
              <p className="mt-1 text-xs text-gray-400">{v.date}</p>
            </div>
            {v.status !== 'archived' && (
              <button
                type="button"
                onClick={() => setPinned(v.version)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  pinned === v.version
                    ? 'bg-fetch-purple text-white'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pinned === v.version ? 'Pinned' : 'Pin'}
              </button>
            )}
          </div>
        ))}
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" defaultChecked className="accent-fetch-purple" />
        Notify consumers on material policy changes
      </label>
    </div>
  )
}

export function IntentPanel() {
  return (
    <div>
      <PanelHeader
        icon={Target}
        title="Intent verification"
        description="Embed signed user intent as a primitive that cascades through multi-hop agent calls. Any agent in the chain can refuse if scope drifts."
      />
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium uppercase text-gray-400">Sample signed intent</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-700">
{`{
  "goal": "book_hotel_under_budget",
  "max_spend": 500,
  "scope": ["search", "hold", "confirm_under_500"],
  "signature": "ed25519:7f2a…",
  "expires": "2026-05-21T18:00:00Z"
}`}
        </pre>
      </div>
      <div className="mt-4 space-y-3">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" defaultChecked className="accent-fetch-purple" />
          Require intent verification on all sub-agent calls
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" defaultChecked className="accent-fetch-purple" />
          Reject transactions that exceed signed scope
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" className="accent-fetch-purple" />
          Allow intent delegation with explicit user approval
        </label>
      </div>
    </div>
  )
}

export function InteropPanel() {
  return (
    <div>
      <PanelHeader
        icon={Globe}
        title="Interoperability beyond Fetch"
        description="Protocol-neutral agent commerce—like email across providers. Connect MCP, Google Agent2Agent, and open standards alongside Fetch A2A."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {interoperabilityProtocols.map((protocol) => (
          <div
            key={protocol.id}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-gray-900">{protocol.name}</h4>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  protocol.status === 'connected'
                    ? 'bg-green-100 text-green-700'
                    : protocol.status === 'beta'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {protocol.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{protocol.description}</p>
            {protocol.status !== 'connected' && (
              <button
                type="button"
                className="mt-4 flex items-center gap-1 text-sm font-medium text-fetch-purple hover:underline"
              >
                Configure bridge
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const panelMap = {
  fiduciary: FiduciaryPanel,
  financial: FinancialPanel,
  audit: AuditPanel,
  consent: ConsentPanel,
  adversarial: AdversarialPanel,
  disclosure: DisclosurePanel,
  arbitration: ArbitrationPanel,
  versioning: VersioningPanel,
  intent: IntentPanel,
  interop: InteropPanel,
}
