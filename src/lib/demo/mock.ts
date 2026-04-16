import type { DemoToastInput } from './types'

type PersistedDemoState<T> = {
  state: T
  activeUserEmail: string
}

export function loadPersistedDemoState<T>(
  storageKey: string,
  createInitialState: () => T,
  defaultUserEmail: string,
) {
  if (typeof window === 'undefined') {
    return { state: createInitialState(), activeUserEmail: defaultUserEmail }
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey)

    if (!rawValue) {
      return { state: createInitialState(), activeUserEmail: defaultUserEmail }
    }

    const parsed = JSON.parse(rawValue) as PersistedDemoState<T>

    return {
      state: parsed.state ?? createInitialState(),
      activeUserEmail: parsed.activeUserEmail ?? defaultUserEmail,
    }
  } catch {
    return { state: createInitialState(), activeUserEmail: defaultUserEmail }
  }
}

export function persistDemoState<T>(storageKey: string, value: PersistedDemoState<T>) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value))
}

export function downloadSampleFile(fileName: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

export function buildToast(title: string, message: string, tone: DemoToastInput['tone'] = 'info'): DemoToastInput {
  return { title, message, tone }
}

export function formatCurrency(value: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function createCsvFromRows(rows: Array<Record<string, string | number>>) {
  if (rows.length === 0) {
    return ''
  }

  const headers = Object.keys(rows[0])
  const lines = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          return `"${String(value).split('"').join('""')}"`
        })
        .join(','),
    ),
  ]

  return lines.join('\n')
}

export function buildWhatsAppHref(message: string) {
  return `https://wa.me/917022556960?text=${encodeURIComponent(message)}`
}
