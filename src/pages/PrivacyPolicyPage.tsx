import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import Seo from '../components/ui/Seo'

export default function PrivacyPolicyPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Privacy Policy | Qode27"
        description="Read the Qode27 privacy policy for how business inquiries and website-submitted information are collected and handled."
        canonicalPath="/privacy-policy"
      />
      <section className="section-spacing pt-12">
        <Container>
          <div className="mx-auto max-w-4xl rounded-[1.4rem] border border-slate-200/70 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950">Privacy Policy</h1>
            <div className="mt-6 space-y-6 text-base leading-8 text-slate-600">
              <p>Qode27 collects the information needed to respond to business inquiries, request demo submissions, consultations, and software delivery communication.</p>
              <p>Information may include contact details, company information, industry details, project requirements, and optional messages submitted through the website or shared directly with our team.</p>
              <p>We use submitted information to evaluate business fit, schedule discussions, respond to inquiries, and support commercial conversations. We do not sell submitted customer data.</p>
              <p>We take reasonable measures to protect submitted information and limit access to people who need it for operational, sales, or service purposes.</p>
              <p>If you would like your information updated or removed, contact Qode27 at qode27business@gmail.com.</p>
            </div>
          </div>
        </Container>
      </section>
    </Motion.div>
  )
}
