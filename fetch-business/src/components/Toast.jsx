import { CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
}

export default function ToastContainer() {
  const { state } = useApp()

  if (!state.toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
      {state.toasts.map((toast) => {
        const Icon = icons[toast.type] || Info
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${styles[toast.type] || styles.info}`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {toast.message}
          </div>
        )
      })}
    </div>
  )
}
