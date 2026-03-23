import Link from 'next/link';

const navItems = [
  { href: '/#solutions', label: 'Solutions' },
  { href: '/#services', label: 'Services' },
  { href: '/#why-kansalt', label: 'Why Kansalt' },
  { href: '/#pricing', label: 'Pricing' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-extrabold tracking-[0.3em] text-white">
            K
          </span>
          <span>
            <span className="block font-display text-2xl tracking-tight text-ink">Kansalt</span>
            <span className="block text-[11px] uppercase tracking-[0.28em] text-slate-500">Premium Software & SaaS</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/#solutions" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink">
            Explore Solutions
          </Link>
          <Link href="/#contact" className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-glow">
            Book Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
