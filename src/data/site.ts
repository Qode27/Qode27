import type { IconType } from 'react-icons'
import {
  FiActivity,
  FiArrowUpRight,
  FiBriefcase,
  FiClock,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi'

export type NavItem = {
  label: string
  href: string
}

export type TrustItem = {
  title: string
  description: string
}

export type Pillar = {
  icon: IconType
  title: string
  text: string
}

export type Testimonial = {
  quote: string
  name: string
  businessType: string
  company: string
}

export type CaseStudyPreview = {
  title: string
  description: string
  outcome: string
}

export type PricingPlan = {
  name: string
  bestFor: string
  priceLabel: string
  description: string
  features: string[]
  supportLevel: string
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Custom Software', href: '/custom-software' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const trustBar: TrustItem[] = [
  {
    title: 'Multi-industry business solutions',
    description: 'Software for logistics, retail, education, healthcare, operations, and internal business systems.',
  },
  {
    title: 'Custom-built for real operations',
    description: 'Every system is shaped around the workflow your team follows every day.',
  },
  {
    title: 'Scalable for growing businesses',
    description: 'Designed to support business expansion, more users, and deeper process visibility.',
  },
  {
    title: 'Designed for Indian SMBs and enterprises',
    description: 'Practical rollout, strong usability, and grounded implementation support.',
  },
]

export const whyQode: Pillar[] = [
  {
    icon: FiCpu,
    title: 'Built around your business workflow',
    text: 'We start with your operations and shape software around the way your teams actually work.',
  },
  {
    icon: FiLayers,
    title: 'No unnecessary complexity',
    text: 'Qode27 focuses on operational clarity, cleaner interfaces, and systems people can use with confidence.',
  },
  {
    icon: FiBriefcase,
    title: 'Multi-industry experience',
    text: 'We work across logistics, education, healthcare, retail, HR, and custom business operations.',
  },
  {
    icon: FiClock,
    title: 'Fast implementation',
    text: 'Projects are planned for speed, clarity, and business readiness instead of endless setup cycles.',
  },
  {
    icon: FiTrendingUp,
    title: 'Scalable architecture',
    text: 'The software foundation is built to support additional workflows, users, and reporting over time.',
  },
  {
    icon: FiActivity,
    title: 'Modern UI with operational clarity',
    text: 'Interfaces are clean, premium, and designed to surface the information teams need quickly.',
  },
]

export const customSoftwareReasons = [
  'Every business has a different operating model, approval structure, and reporting requirement.',
  'Not every workflow fits an off-the-shelf product or rigid SaaS template.',
  'Custom software creates better control, stronger visibility, and clearer ownership across teams.',
]

export const buildProcess = [
  {
    title: 'Understand your workflow',
    text: 'We map your operations, bottlenecks, user roles, and business priorities before proposing the system.',
  },
  {
    title: 'Design the system',
    text: 'We turn that operational understanding into interface structure, feature flows, and a practical delivery plan.',
  },
  {
    title: 'Build and test',
    text: 'The software is developed with real operational scenarios in mind and checked carefully before rollout.',
  },
  {
    title: 'Deploy and support',
    text: 'We help teams adopt the system and continue improving it as the business grows.',
  },
]

export const businessScenarios = [
  'Truck enters parking, entry is recorded automatically, and billing begins from the first movement.',
  'Distributor receives stock and inventory updates instantly across records, dispatch planning, and reporting.',
  'Shipping business tracks operational movement and revenue through one clear management system.',
  'Coaching center automates admissions, attendance, and fees without scattered spreadsheets.',
  'Takeaway store tracks daily orders, revenue, and outlet performance from one operational dashboard.',
  'Hospital manages patients, billing, prescriptions, and front-desk workflow with better speed and control.',
]

export const caseStudyPreviews: CaseStudyPreview[] = [
  {
    title: 'Parking business operations digitized',
    description: 'Manual entry tracking, billing confusion, and visibility gaps were replaced with a structured operations dashboard.',
    outcome: 'Cleaner movement records and better revenue visibility',
  },
  {
    title: 'Distribution inventory visibility improved',
    description: 'Stock movement, dispatch planning, and reporting were centralized for faster operational decision-making.',
    outcome: 'Better stock clarity across warehouse and distribution workflows',
  },
  {
    title: 'Coaching admin workload reduced',
    description: 'Admissions, batches, attendance, and fees were moved out of fragmented manual processes.',
    outcome: 'Less admin effort and a more organized institute workflow',
  },
  {
    title: 'Retail order handling streamlined',
    description: 'Order tracking and day-level performance reporting were brought into one operational interface.',
    outcome: 'Faster daily control and clearer revenue monitoring',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'Qode27 understood our workflow quickly and translated it into software that made operations clearer from day one.',
    name: 'Arjun Reddy',
    businessType: 'Logistics Operations',
    company: 'Southline Logistics',
  },
  {
    quote:
      'The system felt premium, but more importantly it solved the exact bottlenecks our team was dealing with every day.',
    name: 'Nazia Khan',
    businessType: 'Education Management',
    company: 'Brightpath Institute',
  },
  {
    quote:
      'We were not looking for generic software. Qode27 gave us a system that matched our business, our team, and our pace of growth.',
    name: 'Vikram S',
    businessType: 'Healthcare Operations',
    company: 'Carepoint Clinics',
  },
]

export const aboutValues: Pillar[] = [
  {
    icon: FiZap,
    title: 'Practical innovation',
    text: 'We focus on software that improves real business operations, not complexity for its own sake.',
  },
  {
    icon: FiBriefcase,
    title: 'Business-first software',
    text: 'Every decision starts with the workflow, reporting, and growth goals of the business.',
  },
  {
    icon: FiShield,
    title: 'Clarity over clutter',
    text: 'We design systems that reduce confusion and make daily execution easier for teams.',
  },
  {
    icon: FiArrowUpRight,
    title: 'Long-term scalability',
    text: 'The software foundation is built to support expansion, additional modules, and better control over time.',
  },
]

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    bestFor: 'Businesses moving out of spreadsheets and manual workflows',
    priceLabel: 'Starting from Rs 18,000/month',
    description: 'Best for focused operational improvements and first-phase software adoption.',
    features: ['Core workflows', 'Standard onboarding', 'Essential dashboards', 'Custom modules available'],
    supportLevel: 'Business-hours support',
  },
  {
    name: 'Growth',
    bestFor: 'Teams that need deeper workflows, role-based access, and more reporting',
    priceLabel: 'Starting from Rs 40,000/month',
    description: 'Designed for growing operations that need stronger process control and system depth.',
    features: ['Expanded modules', 'Priority onboarding', 'Operational reporting', 'Custom modules available'],
    supportLevel: 'Priority support',
  },
  {
    name: 'Enterprise',
    bestFor: 'Larger organizations with multi-team rollouts and advanced workflow requirements',
    priceLabel: 'Custom pricing based on scope',
    description: 'For businesses that need custom architecture, multi-role systems, and long-term scale.',
    features: ['Tailored delivery plan', 'Advanced workflows', 'Leadership visibility', 'Custom modules available'],
    supportLevel: 'Dedicated support model',
  },
]

export const contactMethods = [
  {
    icon: FiPhone,
    title: 'Phone',
    value: '+91 7022556960',
    href: 'tel:+917022556960',
    description: 'For software consultation, product fit, and business discussions.',
  },
  {
    icon: FiMail,
    title: 'Email',
    value: 'qode27business@gmail.com',
    href: 'mailto:qode27business@gmail.com',
    description: 'For detailed requirements, procurement discussions, and follow-up communication.',
  },
  {
    icon: FiMapPin,
    title: 'Location',
    value: 'Hyderabad, India',
    href: 'https://maps.google.com/?q=Hyderabad',
    description: 'Serving businesses across operations, logistics, retail, healthcare, education, and custom systems.',
  },
] as const

export const requestDemoBenefits: Pillar[] = [
  {
    icon: FiUsers,
    title: 'Understand the business first',
    text: 'We begin with your workflow, industry context, and growth goals before arranging the right walkthrough.',
  },
  {
    icon: FiCode,
    title: 'Discuss the right solution path',
    text: 'Whether you need a listed solution or custom software, we guide the conversation based on operational fit.',
  },
  {
    icon: FiDatabase,
    title: 'Move toward implementation clarity',
    text: 'The goal is not just a demo, but a clearer path to rollout, pricing, and business impact.',
  },
]

export const footerQuickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Custom Software', href: '/custom-software' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Request Demo', href: '/request-demo' },
]

export const footerLegalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms and Conditions', href: '/terms-and-conditions' },
]
