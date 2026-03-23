import { Header } from '../../components/header';

const highlights = [
  { label: 'Core expertise', value: 'Custom SaaS + DevOps', meta: 'Architecture, product design, and delivery under one team' },
  { label: 'Primary industries', value: 'Hospitals, Education, Firms', meta: 'Purpose-built software for operationally complex businesses' },
  { label: 'Flagship live solution', value: 'HMS', meta: 'Live hospital application at hms.kansalt.com' }
];

export default function DashboardPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-8">
            <div>
              <p className="section-kicker">Company Overview</p>
              <h1 className="section-title">A software partner for businesses that need systems built with depth and polish.</h1>
              <p className="mt-5 max-w-3xl text-lg text-slate-600">
                Kansalt combines product strategy, premium UI, backend engineering, and cloud delivery to build software that becomes part of how a business runs every day.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((card) => (
                <article key={card.label} className="lux-panel p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">{card.label}</p>
                  <p className="mt-3 text-2xl font-extrabold text-ink">{card.value}</p>
                  <p className="mt-3 text-sm text-slate-600">{card.meta}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="mesh-panel p-8">
            <p className="section-kicker">Direct Access</p>
            <div className="mt-6 grid gap-4">
              <a href="https://hms.kansalt.com" className="rounded-[1.6rem] border border-white/70 bg-white/80 p-5 transition hover:-translate-y-1">
                <p className="font-semibold text-ink">Hospital Management System</p>
                <p className="mt-2 text-sm text-slate-600">Open the live HMS application for hospital operations.</p>
              </a>
              <a href="/#contact" className="rounded-[1.6rem] border border-white/70 bg-white/80 p-5 transition hover:-translate-y-1">
                <p className="font-semibold text-ink">Book Consultation</p>
                <p className="mt-2 text-sm text-slate-600">Discuss a custom software solution for your business category.</p>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
