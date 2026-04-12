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

export type SolutionOverviewGroup = {
  title: string
  problem: string
  outcome: string
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
  before: string
  after: string
  description: string
  outcome: string
}

export type UseCaseScenario = {
  scenario: string
  problem: string
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
    title: 'Built for real business operations',
    description: 'Designed around how work moves on the ground, not around generic software assumptions.',
  },
  {
    title: 'Designed for Indian SMB workflows',
    description: 'Practical for growing teams that need better control, clearer reporting, and fast adoption.',
  },
  {
    title: 'Fast deployment cycles',
    description: 'Built to move from requirement to usable system without slow, overcomplicated rollout.',
  },
  {
    title: 'Custom-ready systems',
    description: 'Tailored to your workflow today with room to add users, modules, and visibility over time.',
  },
]

export const solutionOverviewGroups: SolutionOverviewGroup[] = [
  {
    title: 'Operations and Logistics Systems',
    problem: 'Movement, dispatch, status updates, and billing often sit across calls, sheets, and disconnected tools.',
    outcome: 'Qode27 brings operational flow into one system so teams work with live visibility, cleaner execution, and better control.',
  },
  {
    title: 'Inventory and Distribution Systems',
    problem: 'Stock errors, dispatch delays, and weak warehouse visibility make it harder to plan and harder to trust the numbers.',
    outcome: 'We build systems that keep inventory, inward and outward movement, and reporting aligned so decisions happen faster.',
  },
  {
    title: 'Business Management Systems',
    problem: 'Front-desk work, student admin, retail activity, internal approvals, and daily reporting become messy when managed manually.',
    outcome: 'The result is a cleaner operating layer across departments, with less manual work and stronger day-to-day ownership.',
  },
  {
    title: 'Custom Software',
    problem: 'Some businesses are too operationally specific for off-the-shelf software or rigid templates.',
    outcome: 'We design software around the way your business already works, then structure it for scale, usability, and speed.',
  },
]

export const whyQode: Pillar[] = [
  {
    icon: FiCpu,
    title: 'Built around workflows, not templates',
    text: 'We study how your operation actually runs, then design the system around real approvals, movement, reporting, and execution.',
  },
  {
    icon: FiLayers,
    title: 'Practical systems, not overengineered ones',
    text: 'The goal is usable control, not bloated software. Every screen and workflow is there to reduce friction and improve decision-making.',
  },
  {
    icon: FiBriefcase,
    title: 'Multi-industry understanding',
    text: 'We work across logistics, distribution, healthcare, retail, education, and internal operations, which helps us spot patterns others miss.',
  },
  {
    icon: FiClock,
    title: 'Fast execution',
    text: 'Projects are scoped for momentum. We focus on the workflows that matter first and move quickly toward a usable rollout.',
  },
  {
    icon: FiTrendingUp,
    title: 'Systems that scale with the business',
    text: 'Your software should not break the moment the team grows. We plan for more users, more process depth, and stronger visibility over time.',
  },
  {
    icon: FiActivity,
    title: 'Clean UI with operational clarity',
    text: 'Good software should feel obvious to use. We design interfaces that surface the right information without clutter or confusion.',
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

export const businessScenarios: UseCaseScenario[] = [
  {
    scenario: 'Truck parking site handling high daily vehicle movement',
    problem: 'Entries, exits, slot usage, and billing are tracked manually, creating disputes and weak revenue visibility.',
    outcome: 'The operation runs through one live system with cleaner movement records, faster billing, and better site control.',
  },
  {
    scenario: 'Distributor managing stock across warehouse and dispatch',
    problem: 'Inventory figures drift when inward, outward, and dispatch activity are updated in separate sheets or by phone.',
    outcome: 'Stock position, movement history, and dispatch planning stay aligned, giving the team better control over inventory decisions.',
  },
  {
    scenario: 'Logistics business coordinating active jobs and status updates',
    problem: 'Teams lose visibility when status updates, billing, and operational progress sit across chats, calls, and spreadsheets.',
    outcome: 'Management gets one operating view for movement, status, and revenue, reducing follow-up effort and improving decisions.',
  },
  {
    scenario: 'Coaching institute managing admissions, attendance, and fees',
    problem: 'Admin teams spend too much time reconciling records and chasing updates across manual tools.',
    outcome: 'Student operations become structured, fee tracking becomes clearer, and the institute spends less time on admin work.',
  },
  {
    scenario: 'Retail or takeaway business running fast daily order volume',
    problem: 'Orders, item records, and daily sales reporting are fragmented, making it hard to see what is really happening in the business.',
    outcome: 'Owners get clearer day-level control over orders, revenue, and outlet performance from one operating system.',
  },
  {
    scenario: 'Hospital or clinic managing front-desk, billing, and patient flow',
    problem: 'Manual coordination slows teams down and makes billing accuracy harder to maintain across departments.',
    outcome: 'Patient handling becomes more structured, billing becomes cleaner, and administrators get better operational visibility.',
  },
]

export const caseStudyPreviews: CaseStudyPreview[] = [
  {
    title: 'Parking operations moved from manual tracking to live control',
    before: 'Vehicle movement and billing were handled manually, which created delays, billing confusion, and weak operational visibility.',
    after: 'A structured parking system connected entry, slot usage, billing, and reporting in one workflow.',
    description: 'The business moved from reactive tracking to a clearer operating model with fewer billing disputes.',
    outcome: 'Cleaner movement records, faster billing, and better revenue visibility',
  },
  {
    title: 'Distribution team gained control over stock movement and dispatch',
    before: 'Warehouse updates and dispatch planning were spread across manual records, slowing decisions and reducing trust in stock data.',
    after: 'Inventory, movement, and dispatch visibility were centralized into one operational system.',
    description: 'The team gained a more reliable picture of stock position and a faster way to plan daily operations.',
    outcome: 'Better stock clarity across warehouse and distribution workflows',
  },
  {
    title: 'Coaching institute reduced admin load across core workflows',
    before: 'Admissions, attendance, batches, and fees were managed through scattered sheets and repetitive manual work.',
    after: 'The institute adopted a unified admin system built around daily academic operations.',
    description: 'Routine work became easier to manage, and leadership gained clearer visibility into student administration.',
    outcome: 'Less admin effort and a more organized institute workflow',
  },
  {
    title: 'Retail business improved daily order and revenue control',
    before: 'Order handling and sales reporting were fragmented, making it difficult to track outlet performance cleanly.',
    after: 'Orders, revenue, and day-level performance moved into one structured interface.',
    description: 'The business gained faster control over daily operations without relying on manual reporting at the end of the day.',
    outcome: 'Faster daily control and clearer revenue monitoring',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'They understood the way our operation actually worked. The system was clear, practical, and our team started using it quickly.',
    name: 'Arjun Reddy',
    businessType: 'Logistics and Operations',
    company: 'Southline Logistics',
  },
  {
    quote:
      'What stood out was the clarity. It did not feel like generic software. It felt like something built around our daily workflow.',
    name: 'Nazia Khan',
    businessType: 'Education Operations',
    company: 'Brightpath Institute',
  },
  {
    quote:
      'We did not need more features. We needed more control. Qode27 helped us simplify the workflow and see the business more clearly.',
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
