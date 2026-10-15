import LegalDocument from '../components/ui/LegalDocument'
import Seo from '../components/ui/Seo'
import { company } from '../data/company'

export default function TermsPage() {
  return (
    <>
      <Seo title="Website Terms | Qode27" description="Terms governing use of the Qode27 website." canonicalPath="/terms" />
      <LegalDocument title="Website terms" updatedNote="Effective date: to be confirmed">
        <h2>About this website</h2>
        <p>This website is operated by Qode27 for informational, business development, and customer communication purposes.</p>

        <h2>No binding agreement</h2>
        <p>
          Submitting an inquiry, contact form, or demo request does not create a binding commercial agreement. Any commercial engagement is governed by separate
          proposal, scope, and contract terms.
        </p>

        <h2>Interactive demos</h2>
        <p>
          Product demos use fictional sample data and are provided to illustrate product behaviour. They are not a representation of any specific customer’s data or
          results.
        </p>

        <h2>Intellectual property</h2>
        <p>All website content, design assets, product descriptions, and brand materials remain the property of Qode27 unless otherwise stated.</p>

        <h2>Acceptable use</h2>
        <p>
          Users must not submit misleading information, misuse forms, attempt unauthorised access, or use the website in a way that could harm Qode27 or other
          parties.
        </p>

        <h2>Governing law</h2>
        <p>Governing law and jurisdiction: to be confirmed following legal review.</p>

        <h2>Changes</h2>
        <p>
          Qode27 may update these terms from time to time. Questions about these terms can be sent to{' '}
          <a href={company.emailHref} className="text-white underline underline-offset-4">
            {company.email}
          </a>
          .
        </p>
      </LegalDocument>
    </>
  )
}
