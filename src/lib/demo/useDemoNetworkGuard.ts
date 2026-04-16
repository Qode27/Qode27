import { useEffect } from 'react'

function isBlockedDemoRequest(url: string) {
  if (!url) {
    return false
  }

  const isAbsolute = /^https?:\/\//i.test(url)
  const normalized = isAbsolute ? new URL(url, window.location.origin) : new URL(url, window.location.origin)
  const isExternal = normalized.origin !== window.location.origin
  const isApiRoute = normalized.pathname.startsWith('/api') || normalized.pathname.includes('/graphql')

  return isExternal || isApiRoute
}

export function useDemoNetworkGuard() {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window)
    const originalOpen = window.XMLHttpRequest.prototype.open
    const originalSendBeacon = navigator.sendBeacon?.bind(navigator)

    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

      if (isBlockedDemoRequest(url)) {
        throw new Error('Demo mode blocks live network requests.')
      }

      return originalFetch(input, init)
    }

    const guardedOpen = function open(this: XMLHttpRequest, ...args: Parameters<XMLHttpRequest['open']>) {
      const url = args[1]

      if (typeof url === 'string' && isBlockedDemoRequest(url)) {
        throw new Error('Demo mode blocks live XMLHttpRequest calls.')
      }

      return originalOpen.apply(this, args)
    }

    ;(window.XMLHttpRequest.prototype as unknown as { open: XMLHttpRequest['open'] }).open = guardedOpen as unknown as XMLHttpRequest['open']

    if (originalSendBeacon) {
      navigator.sendBeacon = (url, data) => {
        if (typeof url === 'string' && isBlockedDemoRequest(url)) {
          return false
        }

        return originalSendBeacon(url, data)
      }
    }

    return () => {
      window.fetch = originalFetch
      window.XMLHttpRequest.prototype.open = originalOpen
      if (originalSendBeacon) {
        navigator.sendBeacon = originalSendBeacon
      }
    }
  }, [])
}
