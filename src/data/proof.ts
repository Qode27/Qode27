/**
 * Verifiable proof. Every entry here is shown publicly, so add only real people,
 * clients who have agreed to be named, and testimonials with written permission.
 * Sections that use these lists stay hidden while a list is empty.
 */

export type TeamMember = { name: string; role: string; bio: string; linkedin?: string; photo?: string }
export type ClientReference = { name: string; industry: string; logo?: string }
export type Testimonial = { quote: string; name: string; role: string; company: string }

export const team: TeamMember[] = []

export const clients: ClientReference[] = []

export const testimonials: Testimonial[] = []
