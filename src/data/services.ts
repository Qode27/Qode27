import type { IconType } from 'react-icons'
import { FiCloud, FiCode, FiGitMerge, FiLayers, FiMonitor, FiPenTool } from 'react-icons/fi'

export type ServiceVisual = 'architecture' | 'browser' | 'platform' | 'automation' | 'design' | 'infrastructure'

export type Service = {
  slug: string
  icon: IconType
  name: string
  shortName: string
  outcome: string
  summary: string
  heroTitle: string
  heroText: string
  visual: ServiceVisual
  problems: { title: string; text: string }[]
  capabilities: { title: string; text: string }[]
  deliverables: string[]
  useCases: string[]
  methodology: { title: string; text: string }[]
  faqs: { question: string; answer: string }[]
  relatedProducts: string[]
  seoTitle: string
  seoDescription: string
}

export const services: Service[] = [
  {
    slug: 'custom-software',
    icon: FiCode,
    name: 'Custom Software Development',
    shortName: 'Custom Software',
    outcome: 'Software shaped around the way your business already operates.',
    summary:
      'For operations too specific for off-the-shelf products. We design and build business systems around your approvals, data, roles, and reporting.',
    heroTitle: 'Software built around your operating model — not the other way around.',
    heroText:
      'When rigid products force your team into workarounds, we design a system around how work actually moves: who approves, what gets recorded, and what leadership needs to see.',
    visual: 'architecture',
    problems: [
      { title: 'Off-the-shelf fit is poor', text: 'Generic products force teams to bend processes, maintain parallel spreadsheets, and accept missing steps.' },
      { title: 'Operational data is scattered', text: 'Records live across calls, chats, paper, and disconnected tools, so no one trusts a single number.' },
      { title: 'Ownership is unclear', text: 'Without a system of record, approvals stall and accountability depends on follow-up rather than structure.' },
    ],
    capabilities: [
      { title: 'Workflow-first system design', text: 'Roles, approvals, states, and exceptions mapped before a line of code is written.' },
      { title: 'Role-based access', text: 'Each user sees the screens and actions relevant to their responsibility.' },
      { title: 'Operational dashboards', text: 'Reporting designed around the decisions leadership actually makes.' },
      { title: 'Modular architecture', text: 'A foundation that accepts new modules, users, and locations without a rebuild.' },
      { title: 'Data migration', text: 'Structured movement of existing records from spreadsheets and legacy tools.' },
      { title: 'Ongoing evolution', text: 'Continued improvement as the business and its processes change.' },
    ],
    deliverables: [
      'Workflow and role map',
      'Interface prototypes for key screens',
      'Production web application',
      'Role and permission configuration',
      'Reporting views',
      'Onboarding support for your team',
    ],
    useCases: [
      'Replacing a spreadsheet-driven operation with a single system of record',
      'Building an internal tool for a process no product covers well',
      'Unifying several departmental tools into one operating layer',
      'Extending one of our product foundations with business-specific modules',
    ],
    methodology: [
      { title: 'Workflow discovery', text: 'Sessions with the people who do the work, not only the people who sponsor it.' },
      { title: 'Phased scope', text: 'The highest-friction workflows are delivered first, then the system expands.' },
      { title: 'Milestone reviews', text: 'Working software reviewed with your team at every milestone.' },
      { title: 'Adoption support', text: 'Rollout planned around how your team will learn and use the system.' },
    ],
    faqs: [
      {
        question: 'When is custom software the right choice over an existing product?',
        answer:
          'When your process is a competitive advantage or simply too specific for generic tools — for example, unusual approval chains, industry-specific records, or reporting that products cannot produce. If one of our products fits closely, we will recommend starting there and extending it.',
      },
      {
        question: 'Can you start from one of your existing products?',
        answer:
          'Yes. Our product foundations — such as hospital management, inventory, logistics, or HRMS — can be extended with business-specific modules, which often shortens delivery.',
      },
      {
        question: 'How do you scope a custom project?',
        answer:
          'We begin with a workflow discussion, identify the processes causing the most friction, and propose a phased plan. Scope and commercial terms are discussed directly after we understand the requirement.',
      },
    ],
    relatedProducts: ['healthcare-management', 'inventory-management', 'hrms'],
    seoTitle: 'Custom Software Development | Qode27',
    seoDescription:
      'Custom business software designed around your workflows, approvals, and reporting. Qode27 builds production systems for operations that off-the-shelf products do not fit.',
  },
  {
    slug: 'web-applications',
    icon: FiMonitor,
    name: 'Web Application Development',
    shortName: 'Web Applications',
    outcome: 'Fast, reliable browser-based systems your whole team can use from day one.',
    summary:
      'Production web applications — operational dashboards, portals, and internal tools — engineered for clarity, speed, and long-term maintainability.',
    heroTitle: 'Web applications engineered for daily operational use.',
    heroText:
      'Browser-based software means no installation, instant updates, and access from any office or device. We build web applications that stay fast and understandable as data and users grow.',
    visual: 'browser',
    problems: [
      { title: 'Legacy tools slow teams down', text: 'Desktop-only or outdated systems make access, updates, and collaboration difficult.' },
      { title: 'Interfaces nobody wants to use', text: 'Cluttered screens lead to workarounds and inconsistent data entry.' },
      { title: 'Performance degrades with growth', text: 'Systems that were fine at launch become slow as records and users increase.' },
    ],
    capabilities: [
      { title: 'Operational dashboards', text: 'Live views of the activity and exceptions that need attention.' },
      { title: 'Customer and partner portals', text: 'Secure, role-scoped access for people outside your organization.' },
      { title: 'Internal tools', text: 'Purpose-built screens for data entry, review, and approval.' },
      { title: 'Responsive interfaces', text: 'Layouts designed for desktop operations and on-the-go mobile access.' },
      { title: 'Search, filters, and exports', text: 'Finding and sharing records without manual compilation.' },
      { title: 'API-ready backends', text: 'Services structured to connect with other systems when needed.' },
    ],
    deliverables: [
      'Responsive web application',
      'Component-based interface system',
      'Backend services and database',
      'Authentication and role management',
      'Deployment pipeline',
      'Technical handover documentation',
    ],
    useCases: [
      'Operations control dashboards',
      'Client-facing portals for status and records',
      'Internal approval and review tools',
      'Replacing desktop-only legacy software',
    ],
    methodology: [
      { title: 'Interface-first planning', text: 'Key screens are prototyped and validated before development begins.' },
      { title: 'Component systems', text: 'Consistent, reusable interface components keep the product coherent.' },
      { title: 'Performance budgets', text: 'Pages are built to stay responsive as data volumes grow.' },
      { title: 'Automated delivery', text: 'CI/CD pipelines make releases routine rather than risky.' },
    ],
    faqs: [
      {
        question: 'Which technologies do you use?',
        answer:
          'Our standard stack is React and Next.js for interfaces, Node.js for application services, and PostgreSQL with Supabase for data, deployed to cloud infrastructure through automated CI/CD. We adapt where an existing environment requires it.',
      },
      {
        question: 'Will the application work on phones and tablets?',
        answer: 'Yes. Interfaces are responsive by default, with layouts designed for the devices your team actually uses.',
      },
    ],
    relatedProducts: ['logistics-shipping', 'crm-sales', 'parking-management'],
    seoTitle: 'Web Application Development | Qode27',
    seoDescription:
      'Production web applications, dashboards, portals, and internal tools built with React, Node.js, and PostgreSQL. Engineered by Qode27 for operational clarity and speed.',
  },
  {
    slug: 'saas-development',
    icon: FiLayers,
    name: 'SaaS Product Development',
    shortName: 'SaaS Products',
    outcome: 'Multi-tenant products designed to be sold, onboarded, and expanded.',
    summary:
      'We design and engineer software-as-a-service platforms — the same discipline behind our own vertical products — from data model to subscription-ready architecture.',
    heroTitle: 'SaaS platforms engineered by a team that builds its own.',
    heroText:
      'Qode27 develops its own industry platforms. We bring the same approach to your product: a modular foundation, tenant-aware data, and a path from first customers to many.',
    visual: 'platform',
    problems: [
      { title: 'Prototype architecture', text: 'Early products often cannot separate customer data, roles, or configuration cleanly.' },
      { title: 'Every customer becomes a fork', text: 'Without configuration layers, customization turns into unmaintainable code branches.' },
      { title: 'Onboarding is manual', text: 'Setting up new customers takes engineering time instead of a guided process.' },
    ],
    capabilities: [
      { title: 'Multi-tenant architecture', text: 'Customer data separated and secured within a shared platform.' },
      { title: 'Modular product design', text: 'Core platform plus modules that can be enabled per customer.' },
      { title: 'Configuration over customization', text: 'Workflows, fields, and roles adjustable without code changes.' },
      { title: 'Subscription-ready foundations', text: 'Account, plan, and access structures ready for commercial models you define.' },
      { title: 'Admin and support tooling', text: 'Internal consoles for onboarding, configuration, and support.' },
      { title: 'Product iteration', text: 'Release processes that let the product evolve with customer feedback.' },
    ],
    deliverables: [
      'Product architecture and data model',
      'Multi-tenant application',
      'Tenant administration console',
      'Module and configuration framework',
      'Release and deployment pipeline',
      'Product roadmap support',
    ],
    useCases: [
      'Turning an internal tool into a product for other businesses',
      'Building a vertical SaaS product for a specific industry',
      'Re-architecting an early product for multiple customers',
    ],
    methodology: [
      { title: 'Product framing', text: 'Define the core users, the first valuable workflow, and what stays configurable.' },
      { title: 'Foundation first', text: 'Tenancy, roles, and data boundaries are built correctly from the start.' },
      { title: 'Module expansion', text: 'New capabilities ship as modules rather than one-off changes.' },
      { title: 'Continuous release', text: 'Frequent, low-risk releases backed by automated delivery.' },
    ],
    faqs: [
      {
        question: 'Do you build SaaS products for other companies, or only your own?',
        answer:
          'Both. Our own vertical platforms are built on the same practices we apply to client SaaS products: modular architecture, tenant-aware data, and configuration-driven workflows.',
      },
      {
        question: 'Can you handle subscription and billing logic?',
        answer:
          'We build the account, plan, and access structures a subscription product needs. Payment-provider integration is scoped per project based on the provider you choose.',
      },
    ],
    relatedProducts: ['hrms', 'crm-sales', 'accounting-firm'],
    seoTitle: 'SaaS Product Development | Qode27',
    seoDescription:
      'SaaS development with multi-tenant architecture, modular product design, and configuration-driven workflows. Qode27 builds SaaS platforms for itself and for clients.',
  },
  {
    slug: 'business-automation',
    icon: FiGitMerge,
    name: 'Business Process Automation',
    shortName: 'Process Automation',
    outcome: 'Less manual coordination, fewer errors, and clearer accountability.',
    summary:
      'We replace manual handoffs — calls, chats, paper, and re-keyed spreadsheets — with structured digital workflows, rules, and notifications.',
    heroTitle: 'Replace manual coordination with structured, automated workflows.',
    heroText:
      'Most operational friction sits between steps: waiting for approval, re-entering data, chasing status. We digitize those handoffs so work moves without constant follow-up.',
    visual: 'automation',
    problems: [
      { title: 'Work stalls between people', text: 'Approvals and handoffs depend on someone remembering to follow up.' },
      { title: 'The same data is entered twice', text: 'Teams re-key information between sheets and tools, introducing errors.' },
      { title: 'Status is invisible', text: 'Managers learn about delays only after they have already become problems.' },
    ],
    capabilities: [
      { title: 'Workflow digitization', text: 'Paper and spreadsheet processes converted into guided digital flows.' },
      { title: 'Approval routing', text: 'Requests routed to the right person with clear status at every step.' },
      { title: 'Rules and validations', text: 'Business rules applied automatically to prevent incomplete or inconsistent records.' },
      { title: 'Notifications', text: 'The right people informed when action is required.' },
      { title: 'Document and report generation', text: 'Invoices, summaries, and exports produced from system data.' },
      { title: 'System integration', text: 'Connections between tools so data flows without re-entry, scoped per project.' },
    ],
    deliverables: [
      'Current-state process map',
      'Automated workflow design',
      'Workflow application or module',
      'Approval and notification rules',
      'Operational reporting',
      'Team onboarding',
    ],
    useCases: [
      'Purchase and expense approvals',
      'Job, dispatch, or shipment status tracking',
      'Fee, invoice, and collection follow-up',
      'Attendance, leave, and HR requests',
    ],
    methodology: [
      { title: 'Map the current process', text: 'Document every step, handoff, and exception as it really happens today.' },
      { title: 'Remove before automating', text: 'Eliminate unnecessary steps first, then automate what remains.' },
      { title: 'Pilot with one team', text: 'Validate the workflow with real users before wider rollout.' },
      { title: 'Measure and refine', text: 'Use the system’s own data to identify the next bottleneck.' },
    ],
    faqs: [
      {
        question: 'Do we need to replace our existing tools?',
        answer:
          'Not necessarily. Some automation sits on top of existing tools; some replaces them. We recommend the least disruptive path that still removes the manual work.',
      },
      {
        question: 'Can automation work for small teams?',
        answer: 'Yes. Smaller teams often benefit most, because manual coordination consumes a larger share of their time.',
      },
    ],
    relatedProducts: ['hrms', 'accounting-firm', 'logistics-shipping'],
    seoTitle: 'Business Process Automation | Qode27',
    seoDescription:
      'Business process automation that replaces manual handoffs with structured workflows, approval routing, and notifications. Qode27 digitizes operations for growing businesses.',
  },
  {
    slug: 'product-design',
    icon: FiPenTool,
    name: 'UI/UX and Product Design',
    shortName: 'Product Design',
    outcome: 'Interfaces your team understands without a training manual.',
    summary:
      'Product and interface design for business software: information architecture, workflows, prototypes, and component systems that keep complex products clear.',
    heroTitle: 'Design that makes complex operations feel obvious.',
    heroText:
      'Business software fails when people avoid using it. We design interfaces around the decisions and actions each role performs — so the right information is visible and the next step is clear.',
    visual: 'design',
    problems: [
      { title: 'Screens built around the database', text: 'Interfaces that mirror tables instead of tasks confuse the people using them.' },
      { title: 'Inconsistent product experience', text: 'Each new feature looks and behaves differently, increasing training time.' },
      { title: 'Low adoption', text: 'Teams fall back to spreadsheets when the software feels harder than the old way.' },
    ],
    capabilities: [
      { title: 'Workflow and task analysis', text: 'Understand what each role needs to see, decide, and do.' },
      { title: 'Information architecture', text: 'Navigation and structure that scales as modules are added.' },
      { title: 'Interactive prototypes', text: 'Clickable flows validated with users before development.' },
      { title: 'Design systems', text: 'Reusable components, tokens, and patterns for consistent products.' },
      { title: 'Dashboard design', text: 'Reporting views that prioritize exceptions and decisions.' },
      { title: 'Usability review', text: 'Evaluation of existing products with prioritized improvements.' },
    ],
    deliverables: [
      'Role and task maps',
      'Information architecture',
      'Interactive prototypes',
      'High-fidelity interface designs',
      'Component library and tokens',
      'Developer-ready specifications',
    ],
    useCases: [
      'Designing a new business application before development',
      'Redesigning an existing product with low adoption',
      'Creating a design system for a growing product',
    ],
    methodology: [
      { title: 'Observe the work', text: 'Understand real tasks, constraints, and environments.' },
      { title: 'Structure before style', text: 'Information architecture and flows are resolved before visual design.' },
      { title: 'Prototype and test', text: 'Validate flows with representative users.' },
      { title: 'Systematize', text: 'Turn validated patterns into reusable components.' },
    ],
    faqs: [
      {
        question: 'Can you design for a product another team will build?',
        answer: 'Yes. We deliver developer-ready specifications and component libraries that any engineering team can implement.',
      },
      {
        question: 'Do you redesign existing software?',
        answer: 'Yes. We review the current product, identify the highest-impact problems, and propose a phased redesign.',
      },
    ],
    relatedProducts: ['healthcare-management', 'coaching-management', 'retail-takeaway'],
    seoTitle: 'UI/UX and Product Design for Business Software | Qode27',
    seoDescription:
      'UI/UX and product design for business software: workflow analysis, information architecture, prototypes, and design systems that improve adoption.',
  },
  {
    slug: 'cloud-backend',
    icon: FiCloud,
    name: 'Cloud and Backend Engineering',
    shortName: 'Cloud & Backend',
    outcome: 'Reliable data, services, and infrastructure underneath your software.',
    summary:
      'Backend services, data modelling, and cloud deployment for business systems — built for reliability, maintainability, and growth.',
    heroTitle: 'The foundation underneath dependable business software.',
    heroText:
      'Interfaces are only as trustworthy as the data and services behind them. We engineer backends, databases, and delivery pipelines that keep business systems correct and available.',
    visual: 'infrastructure',
    problems: [
      { title: 'Fragile data models', text: 'Poorly structured data makes reporting unreliable and new features expensive.' },
      { title: 'Manual deployments', text: 'Releases depend on individuals and carry unnecessary risk.' },
      { title: 'Scaling as an afterthought', text: 'Systems slow down or fail as usage grows because capacity was never planned.' },
    ],
    capabilities: [
      { title: 'Data modelling', text: 'Relational models in PostgreSQL designed for correctness and reporting.' },
      { title: 'Application services', text: 'Node.js services with clear boundaries and APIs.' },
      { title: 'Authentication and access', text: 'Secure sign-in and role-based authorization.' },
      { title: 'Cloud deployment', text: 'Hosting configured for the availability your operations need.' },
      { title: 'CI/CD pipelines', text: 'Automated build, test, and release processes.' },
      { title: 'Integrations and APIs', text: 'Interfaces for connecting with other systems, scoped per project.' },
    ],
    deliverables: [
      'Data model and schema',
      'Backend services and APIs',
      'Authentication and authorization',
      'Cloud environment configuration',
      'CI/CD pipeline',
      'Operational documentation',
    ],
    useCases: [
      'Backend for a new web or SaaS product',
      'Restructuring data for reliable reporting',
      'Introducing automated deployments to an existing product',
    ],
    methodology: [
      { title: 'Model the domain', text: 'Start from business entities and rules, not tables.' },
      { title: 'Automate delivery', text: 'Every change flows through the same tested pipeline.' },
      { title: 'Secure by default', text: 'Credentials in environment configuration, least-privilege access.' },
      { title: 'Plan for growth', text: 'Capacity and data growth considered from the first release.' },
    ],
    faqs: [
      {
        question: 'Which cloud providers do you work with?',
        answer: 'We select hosting based on the project’s requirements and any existing environment. Our standard stack uses PostgreSQL with Supabase and cloud infrastructure deployed through automated CI/CD.',
      },
      {
        question: 'Can you work on an existing backend?',
        answer: 'Yes. We can review, stabilize, and extend existing services, or plan a phased migration where that is the better path.',
      },
    ],
    relatedProducts: ['inventory-management', 'port-operations', 'crm-sales'],
    seoTitle: 'Cloud and Backend Engineering | Qode27',
    seoDescription:
      'Backend engineering, PostgreSQL data modelling, cloud deployment, and CI/CD pipelines for dependable business software. Built by Qode27.',
  },
]

export function getServiceBySlug(slug?: string) {
  return services.find((service) => service.slug === slug)
}
