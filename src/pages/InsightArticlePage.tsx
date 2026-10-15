import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import CtaSection from '../components/ui/CtaSection'
import Seo from '../components/ui/Seo'
import { SITE_URL } from '../data/company'
import { getInsightBySlug, insightCategories } from '../data/insights'
import NotFoundPage from './NotFoundPage'

/** Article template. Renders entries from `src/data/insights.ts`. */
export default function InsightArticlePage() {
  const { slug } = useParams()
  const article = getInsightBySlug(slug)
  if (!article) return <NotFoundPage />

  const category = insightCategories.find((item) => item.slug === article.category)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: 'Qode27', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
  }

  return (
    <>
      <Seo title={`${article.title} | Qode27 Insights`} description={article.excerpt} canonicalPath={`/insights/${article.slug}`} jsonLd={jsonLd} />
      <article className="pb-16 pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link to="/insights" className="link-arrow text-sm text-[var(--color-muted)]">
            <FiArrowLeft aria-hidden="true" /> All insights
          </Link>
          <p className="eyebrow mt-10">{category?.name}</p>
          <h1 className="display-lg mt-6">{article.title}</h1>
          <p className="mt-6 text-sm text-[var(--color-subtle)]">
            {article.author} · {new Date(article.publishedAt).toLocaleDateString('en-IN', { dateStyle: 'long' })} · {article.readingMinutes} min read
          </p>
          <div className="prose-doc mt-12 text-lg">
            {article.body.map((block, index) => (
              <section key={block.heading ?? index}>
                {block.heading ? <h2>{block.heading}</h2> : null}
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>
      <CtaSection title="Have a problem like this in your operation?" />
    </>
  )
}
