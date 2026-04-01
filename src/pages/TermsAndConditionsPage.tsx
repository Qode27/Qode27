import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import Seo from '../components/ui/Seo'

export default function TermsAndConditionsPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <Seo
        title="Terms and Conditions | Qode27"
        description="Review the Qode27 terms and conditions for website use, inquiries, software consultations, and service engagement."
        canonicalPath="/terms-and-conditions"
      />
      <section className="section-spacing pt-12">
        <Container>
          <div className="mx-auto max-w-4xl rounded-[1.4rem] border border-slate-200/70 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950">Terms and Conditions</h1>
            <div className="mt-6 space-y-6 text-base leading-8 text-slate-600">
              <p>This website is operated by Qode27 for informational, business development, and customer communication purposes.</p>
              <p>Submitting an inquiry, contact form, or request demo form does not create a binding commercial agreement. Any commercial engagement is governed by separate proposal, scope, and contract terms.</p>
              <p>All website content, design assets, solution descriptions, and brand materials remain the property of Qode27 unless otherwise stated.</p>
              <p>Users must not submit misleading information, misuse forms, attempt unauthorized access, or use the website in a way that could harm Qode27 or other parties.</p>
              <p>Qode27 may update these terms from time to time. Continued use of the website indicates acceptance of the latest published version.</p>
            </div>
          </div>
        </Container>
      </section>
    </Motion.div>
  )
}
