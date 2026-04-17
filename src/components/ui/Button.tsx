import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md'

type CommonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type AnchorButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonProps = AnchorButtonProps | NativeButtonProps

const baseStyles =
  'button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-[1rem] font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-[var(--color-accent)] bg-[linear-gradient(135deg,var(--color-accent)_0%,var(--color-accent-strong)_100%)] px-6 py-3 text-white shadow-[0_18px_40px_rgba(20,131,181,0.18)] hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(20,131,181,0.28)]',
  secondary:
    'border border-slate-200/90 bg-white/96 px-6 py-3 text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,0.05)] backdrop-blur-sm hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)]',
  ghost:
    'border border-transparent bg-transparent px-5 py-3 text-slate-700 hover:-translate-y-0.5 hover:text-[var(--color-accent)]',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-5 text-sm',
  md: 'w-full px-6 text-sm sm:w-auto sm:text-base',
}

export default function Button(props: ButtonProps) {
  const { children, href, variant = 'primary', size = 'md', className = '', ...rest } = props
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  if (href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>

    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link to={href} className={classes} onClick={anchorProps.onClick}>
          {children}
        </Link>
      )
    }

    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
