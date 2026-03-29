const baseStyles =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white'

const variants = {
  primary:
    'border border-black bg-black px-6 py-3 text-white shadow-[0_12px_30px_rgba(11,11,11,0.16)] hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-[0_16px_32px_rgba(200,155,60,0.18)]',
  secondary:
    'border border-black bg-white px-6 py-3 text-black shadow-[0_10px_24px_rgba(11,11,11,0.04)] hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-[0_18px_32px_rgba(11,11,11,0.12)]',
  ghost:
    'border border-white/50 bg-white/88 px-5 py-3 text-black shadow-[0_10px_24px_rgba(255,255,255,0.06)] hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-[0_16px_32px_rgba(211,161,62,0.14)]',
}

const sizes = {
  sm: 'px-5 text-sm',
  md: 'w-full px-6 text-sm sm:w-auto sm:text-base',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
