import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  canonicalPath?: string
  image?: string
}

function ensureMeta(selector: string, attributeName: 'name' | 'property', value: string) {
  let element = document.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, value)
    document.head.appendChild(element)
  }

  return element
}

function ensureCanonical() {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  return link
}

export default function Seo({
  title,
  description,
  canonicalPath = '/',
  image = 'https://qode27.com/qode27-wordmark-cropped.png',
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = `https://qode27.com${canonicalPath}`

    document.title = title

    ensureMeta('meta[name="description"]', 'name', 'description').setAttribute('content', description)
    ensureMeta('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', title)
    ensureMeta('meta[property="og:description"]', 'property', 'og:description').setAttribute('content', description)
    ensureMeta('meta[property="og:type"]', 'property', 'og:type').setAttribute('content', 'website')
    ensureMeta('meta[property="og:url"]', 'property', 'og:url').setAttribute('content', canonicalUrl)
    ensureMeta('meta[property="og:image"]', 'property', 'og:image').setAttribute('content', image)
    ensureMeta('meta[name="twitter:card"]', 'name', 'twitter:card').setAttribute('content', 'summary_large_image')
    ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title').setAttribute('content', title)
    ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description').setAttribute('content', description)
    ensureMeta('meta[name="twitter:image"]', 'name', 'twitter:image').setAttribute('content', image)
    ensureCanonical().setAttribute('href', canonicalUrl)
  }, [canonicalPath, description, image, title])

  return null
}
