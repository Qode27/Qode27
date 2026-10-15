import ApproachTimeline from '../components/home/ApproachTimeline'
import CapabilitiesBento from '../components/home/CapabilitiesBento'
import ChallengesSection from '../components/home/ChallengesSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import HomeHero from '../components/home/HomeHero'
import IndustriesIndex from '../components/home/IndustriesIndex'
import PositioningStatement from '../components/home/PositioningStatement'
import WorkPreview from '../components/home/WorkPreview'
import CtaSection from '../components/ui/CtaSection'
import SectionIntro from '../components/ui/SectionIntro'
import Seo from '../components/ui/Seo'
import SystemMap from '../components/visual/SystemMap'
import { company, SITE_URL } from '../data/company'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Qode27',
  url: SITE_URL,
  logo: `${SITE_URL}/qode27-icon-cropped.png`,
  email: company.email,
  telephone: '+91-7022556960',
  address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'IN' },
}

export default function HomePage() {
  return (
    <>
      <Seo
        title="Qode27 | Business Software, SaaS Platforms & Custom Software Development"
        description="Qode27 designs and builds SaaS platforms, web applications, and custom business software for healthcare, logistics, distribution, education, retail, and professional services."
        canonicalPath="/"
        jsonLd={organizationJsonLd}
      />
      <HomeHero />
      <PositioningStatement />
      <ChallengesSection />
      <CapabilitiesBento />
      <FeaturedProducts />
      <section className="section section-raised rule-top">
        <div className="section-shell">
          <SectionIntro
            eyebrow="One foundation, many systems"
            title="Every product shares a modular core."
            text="Roles, workflows, records, and reporting are engineered once and refined across every vertical — so each product inherits a proven base."
          />
          <div className="mt-14">
            <SystemMap />
          </div>
        </div>
      </section>
      <IndustriesIndex />
      <WorkPreview />
      <ApproachTimeline />
      <CtaSection title="Your business has a workflow. We build the system around it." />
    </>
  )
}
