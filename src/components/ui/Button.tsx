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
  'button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-xl font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-black bg-black px-6 py-3 text-white shadow-[0_16px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[var(--color-ink)] hover:shadow-[0_18px_36px_rgba(19,178,191,0.24)]',
  secondary:
    'border border-black/12 bg-white px-6 py-3 text-black shadow-[0_12px_28px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white',
  ghost:
    'border border-black/10 bg-white/72 px-5 py-3 text-black shadow-[0_8px_18px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-white',
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
