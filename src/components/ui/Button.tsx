import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'light' | 'outline-light'
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

const variants: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  light: 'btn-light',
  'outline-light': 'btn-outline-light',
}

export default function Button(props: ButtonProps) {
  const { children, href, variant = 'primary', size = 'md', className = '', ...rest } = props
  const classes = `btn ${variants[variant]} ${size === 'sm' ? 'btn-sm' : ''} ${className}`.replace(/\s+/g, ' ').trim()

  if (href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>

    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link to={href} className={classes} onClick={anchorProps.onClick} aria-label={anchorProps['aria-label']}>
          {children}
        </Link>
      )
    }

    const external = href.startsWith('http')
    return (
      <a href={href} className={classes} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...anchorProps}>
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
