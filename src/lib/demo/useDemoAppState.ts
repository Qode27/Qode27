import { startTransition, useEffect, useState } from 'react'
import { loadPersistedDemoState, persistDemoState } from './mock'
import type { DemoToast, DemoToastInput, DemoUser } from './types'

export function useDemoAppState<T>(options: {
  storageKey: string
  createInitialState: () => T
  users: DemoUser[]
}) {
  const { storageKey, createInitialState, users } = options
  const defaultUser = users[0]

  const [persisted] = useState(() => loadPersistedDemoState(storageKey, createInitialState, defaultUser.email))
  const [state, setState] = useState<T>(persisted.state)
  const [activeUserEmail, setActiveUserEmail] = useState(persisted.activeUserEmail)
  const [toasts, setToasts] = useState<DemoToast[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const currentUser = users.find((user) => user.email === activeUserEmail) ?? defaultUser

  useEffect(() => {
    persistDemoState(storageKey, {
      state,
      activeUserEmail,
    })
  }, [activeUserEmail, state, storageKey])

  useEffect(() => {
    if (toasts.length === 0) {
      return
    }

    const timer = window.setTimeout(() => {
      setToasts((current) => current.slice(1))
    }, 2800)

    return () => window.clearTimeout(timer)
  }, [toasts])

  const patchState = (updater: (current: T) => T) => {
    startTransition(() => {
      setState((current) => updater(current))
    })
  }

  const addToast = (toast: DemoToastInput) => {
    setToasts((current) => [
      ...current,
      {
        ...toast,
        id: Date.now() + current.length,
      },
    ])
  }

  const switchUser = (email: string) => {
    setActiveUserEmail(email)
  }

  const resetDemo = () => {
    const initialState = createInitialState()
    setState(initialState)
    setActiveUserEmail(defaultUser.email)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey)
    }
  }

  const refreshDemo = () => {
    setIsRefreshing(true)
    window.setTimeout(() => {
      setIsRefreshing(false)
    }, 700)
  }

  return {
    state,
    patchState,
    currentUser,
    users,
    switchUser,
    resetDemo,
    refreshDemo,
    isRefreshing,
    toasts,
    addToast,
  }
}
