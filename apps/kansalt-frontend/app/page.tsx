import { ContactForm } from '../components/contact-form';
import { Header } from '../components/header';
import { IndustrySolutions } from '../components/industry-solutions';
import { SectionReveal } from '../components/section-reveal';
import { WhatsAppFloat } from '../components/whatsapp-float';
import { categories, footerLinks, pricing, reasons, services, testimonials } from '../lib/data';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <WhatsAppFloat />

      <section className="hero-shell relative">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:pb-28 lg:pt-24">
          <SectionReveal className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="space-y-8">
              <span className="eyebrow">Premium Software Development & SaaS Solutions</span>
              <div className="space-y-6">
                <h1 className="max-w-5xl font-display text-5xl leading-[0.95] text-ink md:text-7xl">
                  We Build Software That Runs Your Business
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Premium SaaS solutions for hospitals, coaching institutes, CA firms, law firms, and more.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#solutions" className="button-primary">
                  Explore Solutions
                </a>
                <a href="#contact" className="button-secondary">
                  Book Consultation
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Enterprise-grade build quality', 'Scalable foundations for real business operations'],
                  ['Industry-first product thinking', 'Software shaped around domain workflows'],
                  ['Design that feels premium', 'Polished interfaces with operational clarity']
                ].map(([title, body]) => (
                  <article key={title} className="lux-panel p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">{title}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="lux-panel relative overflow-hidden p-8">
              <div className="soft-grid" />
              <p className="section-kicker relative z-10">Delivery Approach</p>
              <div className="relative z-10 mt-6 grid gap-4">
                {[
                  'Business workflow discovery',
                  'Product-grade UX and frontend engineering',
                  'Cloud-native backend and DevOps delivery',
                  'Long-term support and iterative improvements'
                ].map((item) => (
                  <div key={item} className="rounded-[1.6rem] border border-white/70 bg-white/80 px-5 py-4 font-medium text-ink shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-7xl px-6 py-20">
        <SectionReveal className="mb-12 max-w-3xl">
          <p className="section-kicker">Business Categories</p>
          <h2 className="section-title">Solutions tailored for the industries we help digitize and scale.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore industries, open category-specific solutions, and route users directly into live applications or demos without embedding products into the marketing site.
          </p>
        </SectionReveal>
        <IndustrySolutions categories={categories} />
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <SectionReveal className="mb-12 max-w-3xl">
          <p className="section-kicker">Services</p>
          <h2 className="section-title">Full-spectrum product delivery for businesses that need software with staying power.</h2>
        </SectionReveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <SectionReveal key={service.title} delay={index * 0.06}>
              <article className="lux-panel h-full p-8">
                <h3 className="font-display text-3xl text-ink">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{service.body}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section id="why-kansalt" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionReveal>
            <p className="section-kicker">Why Kansalt</p>
            <h2 className="section-title">Built with technical depth, product taste, and operational understanding.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We design software that feels modern on the surface and reliable underneath. That combination is what makes teams trust a system enough to run their business on it.
            </p>
          </SectionReveal>
          <div className="grid gap-5 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <SectionReveal key={reason.title} delay={index * 0.05}>
                <article className="lux-panel h-full p-7">
                  <h3 className="text-2xl font-bold text-ink">{reason.title}</h3>
                  <p className="mt-4 text-slate-600">{reason.body}</p>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionReveal className="mb-12 max-w-3xl">
          <p className="section-kicker">Testimonials</p>
          <h2 className="section-title">Trusted by teams that need software to feel calm, capable, and business-critical.</h2>
        </SectionReveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <SectionReveal key={testimonial.name} delay={index * 0.05}>
              <article className="lux-panel h-full p-8">
                <p className="font-display text-3xl leading-tight text-ink">“{testimonial.quote}”</p>
                <div className="mt-8">
                  <p className="font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{testimonial.company}</p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <SectionReveal className="mb-12 max-w-3xl">
          <p className="section-kicker">Pricing</p>
          <h2 className="section-title">Engagement models that match your software ambition and rollout stage.</h2>
        </SectionReveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((plan, index) => (
            <SectionReveal key={plan.tier} delay={index * 0.05}>
              <article className="lux-panel h-full p-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">{plan.tier}</p>
                <h3 className="mt-4 font-display text-4xl text-ink">{plan.price}</h3>
                <p className="mt-4 text-slate-600">{plan.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {plan.points.map((point) => (
                    <span key={point} className="pill">
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <SectionReveal>
          <div className="mesh-panel grid gap-10 p-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="section-kicker">Call To Action</p>
              <h2 className="section-title">Get Your Software Built</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Whether you need a hospital platform, institute ERP, internal business system, or a custom SaaS product, Kansalt can design and deliver it with enterprise-grade quality.
              </p>
            </div>
            <ContactForm />
          </div>
        </SectionReveal>
      </section>

      <footer className="border-t border-white/70 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-display text-3xl text-ink">Kansalt</p>
            <p className="mt-3 max-w-2xl text-slate-600">
              Premium software development and SaaS solutions for businesses that want better systems, better operations, and a better digital experience.
            </p>
            <p className="mt-4 text-sm text-slate-500">hello@kansalt.com | +91 99999 99999</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
