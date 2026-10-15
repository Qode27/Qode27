export const SITE_URL = 'https://qode27.com'

export const company = {
  name: 'Qode27',
  legalNameNote: 'Registered legal entity name to be confirmed',
  location: 'Hyderabad, India',
  phoneDisplay: '+91 70225 56960',
  phoneHref: 'tel:+917022556960',
  email: 'qode27business@gmail.com',
  emailHref: 'mailto:qode27business@gmail.com',
  whatsappHref: 'https://wa.me/917022556960',
  mapsHref: 'https://maps.google.com/?q=Hyderabad',
} as const

/** Stack listed in the existing Qode27 technology section. */
export const technologyStack = [
  { name: 'React / Next.js', layer: 'Interface' },
  { name: 'Node.js', layer: 'Application services' },
  { name: 'PostgreSQL + Supabase', layer: 'Data' },
  { name: 'Cloud infrastructure', layer: 'Hosting' },
  { name: 'Automated CI/CD', layer: 'Delivery' },
] as const

export const deliveryPhases = [
  {
    id: 'discover',
    title: 'Understand the workflow',
    text: 'We map operations, bottlenecks, user roles, approvals, and reporting needs before proposing a system.',
    outputs: ['Workflow map', 'Role and permission model', 'Priority scope'],
  },
  {
    id: 'design',
    title: 'Design the system',
    text: 'Operational understanding becomes interface structure, data model, feature flows, and a phased delivery plan.',
    outputs: ['Interface prototypes', 'Data model', 'Delivery plan'],
  },
  {
    id: 'build',
    title: 'Build and test',
    text: 'Software is developed against real operational scenarios and reviewed with your team at every milestone.',
    outputs: ['Working increments', 'Scenario testing', 'Review sessions'],
  },
  {
    id: 'deploy',
    title: 'Deploy and support',
    text: 'We introduce the system into daily operations, help teams adopt it, and keep improving it as the business grows.',
    outputs: ['Rollout and onboarding', 'Ongoing improvements', 'Module expansion'],
  },
] as const

export const principles = [
  {
    title: 'Built around workflows, not templates',
    text: 'We study how the operation actually runs, then design the system around real approvals, movement, reporting, and execution.',
  },
  {
    title: 'Practical before impressive',
    text: 'Every screen and workflow must reduce friction or improve a decision. Features that do neither are left out.',
  },
  {
    title: 'Clarity over clutter',
    text: 'Good business software should feel obvious to use. Interfaces surface the right information without noise.',
  },
  {
    title: 'Momentum in delivery',
    text: 'Projects are scoped so the workflows that matter most reach users first, followed by deliberate expansion.',
  },
  {
    title: 'Designed to scale',
    text: 'Software should not break when the team grows. We plan for more users, deeper processes, and new modules.',
  },
  {
    title: 'Multi-industry pattern knowledge',
    text: 'Work across healthcare, logistics, distribution, education, retail, and professional services reveals patterns that single-vertical teams miss.',
  },
] as const
