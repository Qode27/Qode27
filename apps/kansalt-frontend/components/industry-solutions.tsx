'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { CategoryConfig } from '../lib/data';

type Props = {
  categories: CategoryConfig[];
};

export function IndustrySolutions({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((category, index) => {
          const isActive = activeCategory.name === category.name;
          return (
            <motion.button
              key={category.name}
              type="button"
              onClick={() => setActiveCategory(category)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              whileHover={{ y: -8 }}
              className={isActive ? 'industry-card industry-card-active text-left' : 'industry-card text-left'}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-4xl">{category.icon}</span>
                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {category.products.length} solution{category.products.length > 1 ? 's' : ''}
                </span>
              </div>
              <h3 className="mt-6 font-display text-3xl text-ink">{category.name}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{category.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.outcomes.map((outcome) => (
                  <span key={outcome} className="pill">
                    {outcome}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.aside
        key={activeCategory.name}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="lux-panel sticky top-28 h-fit p-8"
      >
        <p className="section-kicker">Category Detail</p>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-5xl">{activeCategory.icon}</span>
          <div>
            <h3 className="font-display text-4xl text-ink">{activeCategory.name}</h3>
            <p className="mt-2 max-w-2xl text-slate-600">{activeCategory.description}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {activeCategory.products.map((product) => (
            <article key={product.name} className="rounded-[1.8rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-bold text-ink">{product.name}</h4>
                  <p className="mt-3 max-w-2xl text-slate-600">{product.summary}</p>
                </div>
                <span className={product.isDemo ? 'tag tag-demo' : 'tag tag-live'}>
                  {product.isDemo ? 'Demo' : 'Live'}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span key={feature} className="pill">
                    {feature}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href = product.link;
                }}
                className="button-primary mt-8"
              >
                {product.isDemo ? 'View Sample' : 'Open Application'}
              </button>
            </article>
          ))}
        </div>
      </motion.aside>
    </div>
  );
}
