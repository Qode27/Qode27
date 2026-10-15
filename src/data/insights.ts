export type InsightCategory = { slug: string; name: string; description: string }

export type Insight = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readingMinutes: number
  author: string
  body: { heading?: string; paragraphs: string[] }[]
}

export const insightCategories: InsightCategory[] = [
  { slug: 'engineering', name: 'Software Engineering', description: 'Architecture, data, and delivery practices for business systems.' },
  { slug: 'product', name: 'Product Thinking', description: 'Designing software people actually adopt.' },
  { slug: 'automation', name: 'Automation', description: 'Replacing manual coordination with structured workflows.' },
  { slug: 'industry', name: 'Industry Technology', description: 'How software changes operations in specific sectors.' },
]

/**
 * Published articles. Add entries here to publish — the index, category filters,
 * and article template at /insights/:slug render from this list.
 */
export const insights: Insight[] = []

export function getInsightBySlug(slug?: string) {
  return insights.find((insight) => insight.slug === slug)
}
