import { products } from '../data/products'
import { services } from '../data/services'

export const OTHER_INTEREST = 'Something else'

export const interestOptions = {
  Products: products.map((product) => product.name),
  Services: services.map((service) => service.name),
}

const allInterests = [...interestOptions.Products, ...interestOptions.Services, OTHER_INTEREST]

/** Maps a free-form `interest` / legacy `industry` query value onto one of the form options. */
export function matchInterest(raw: string | null) {
  if (!raw) return ''
  const value = raw.toLowerCase().replace(/\s*demo$/, '').trim()
  if (!value) return ''
  return (
    allInterests.find((option) => option.toLowerCase() === value) ??
    allInterests.find((option) => option.toLowerCase().includes(value) || value.includes(option.toLowerCase())) ??
    ''
  )
}
