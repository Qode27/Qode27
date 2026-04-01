import Button from './Button'

type CtaBannerProps = {
  eyebrow: string
  title: string
  description: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CtaBanner({
  eyebrow,
  title,
  description,
  primaryLabel = 'Request Demo',
  primaryHref = '/request-demo',
  secondaryLabel = 'Contact Us',
  secondaryHref = '/contact',
}: CtaBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(135deg,#0f172a_0%,#0b2230_55%,#16394b_100%)] p-8 text-white shadow-[0_30px_70px_rgba(15,23,42,0.16)] sm:p-10">
      <div className="hero-orb right-[-3rem] top-[-4rem] h-40 w-40 bg-cyan-300/20" />
      <div className="hero-orb bottom-[-3rem] left-[-2rem] h-36 w-36 bg-blue-400/20" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">{description}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href={primaryHref} className="shadow-[0_20px_40px_rgba(20,131,181,0.35)] hover:scale-[1.02]">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
