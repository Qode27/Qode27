import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiBookOpen } from 'react-icons/fi'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import Seo from '../components/ui/Seo'
import { insightCategories, insights } from '../data/insights'

export default function InsightsPage() {
  const [category, setCategory] = useState<string>('all')
  const visible = category === 'all' ? insights : insights.filter((insight) => insight.category === category)
  const activeCategory = insightCategories.find((item) => item.slug === category)

  return (
    <>
      <Seo
        title="Insights | Software Engineering, Automation & Industry Technology | Qode27"
        description="Articles from Qode27 on software engineering, product design, business automation, and industry-specific technology."
        canonicalPath="/insights"
        noindex={insights.length === 0}
      />
      <PageHero
        eyebrow="Insights"
        title="Notes on building software that operations depend on."
        text="Engineering practice, product thinking, automation, and how technology changes work in specific industries."
      />

      <section className="pb-24">
        <div className="section-shell">
          <div role="group" aria-label="Filter insights by category" className="-mx-4 flex gap-2 overflow-x-auto border-b border-[var(--color-line)] px-4 pb-6 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ slug: 'all', name: 'All topics' }, ...insightCategories].map((item) => (
              <button
                key={item.slug}
                type="button"
                aria-pressed={category === item.slug}
                onClick={() => setCategory(item.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                  category === item.slug ? 'border-transparent bg-white text-black' : 'border-[var(--color-line-strong)] text-[var(--color-muted)] hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {visible.length > 0 ? (
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((insight) => (
                <li key={insight.slug}>
                  <Link to={`/insights/${insight.slug}`} className="surface surface-interactive group flex h-full flex-col p-7">
                    <p className="mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                      {insightCategories.find((item) => item.slug === insight.category)?.name}
                    </p>
                    <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{insight.title}</h2>
                    <p className="mt-3 flex-1 leading-7 text-[var(--color-muted)]">{insight.excerpt}</p>
                    <p className="mt-6 flex items-center justify-between text-sm text-[var(--color-subtle)]">
                      <span>
                        {new Date(insight.publishedAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })} · {insight.readingMinutes} min read
                      </span>
                      <FiArrowUpRight aria-hidden="true" className="group-hover:text-white" />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-10">
              <div className="grid gap-10 rounded-[1.5rem] border border-dashed border-[var(--color-line-strong)] p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div>
                  <FiBookOpen aria-hidden="true" className="h-7 w-7 text-[var(--color-accent)]" />
                  <h2 className="display-sm mt-6">{activeCategory ? `No ${activeCategory.name.toLowerCase()} articles yet.` : 'The first articles are in preparation.'}</h2>
                  <p className="mt-3 max-w-md leading-7 text-[var(--color-muted)]">
                    We have not published articles here yet. In the meantime, the fastest way to see how we think is to open one of our products — or ask us directly.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button href="/products">Explore Our Products</Button>
                    <Button href="/contact" variant="secondary">
                      Talk to Our Team
                    </Button>
                  </div>
                </div>
                <ul className="grid gap-3">
                  {insightCategories.map((item) => (
                    <li key={item.slug} className="rounded-xl border border-[var(--color-line)] p-5">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
