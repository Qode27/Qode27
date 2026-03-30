interface BrandLogoProps {
  className?: string
  iconOnly?: boolean
}

export default function BrandLogo({ className = '', iconOnly = false }: BrandLogoProps) {
  const src = iconOnly ? '/qode27-icon-cropped.png' : '/qode27-wordmark-cropped.png'
  const alt = iconOnly ? 'Qode27 icon logo' : 'Qode27 logo'

  return (
    <img
      src={src}
      alt={alt}
      width={iconOnly ? 44 : 240}
      height={iconOnly ? 44 : 72}
      className={`${iconOnly ? 'h-11 w-11 object-contain' : 'h-11 w-auto max-w-[16rem] object-contain sm:h-12 sm:max-w-[18rem]'} ${className}`.trim()}
      loading={iconOnly ? 'lazy' : 'eager'}
      decoding="async"
      fetchPriority={iconOnly ? 'low' : 'high'}
    />
  )
}
