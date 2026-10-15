import LegalDocument from '../components/ui/LegalDocument'
import Seo from '../components/ui/Seo'
import { company } from '../data/company'

export default function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy Notice | Qode27" description="How Qode27 collects and uses information submitted through this website." canonicalPath="/privacy" />
      <LegalDocument title="Privacy notice" updatedNote="Effective date: to be confirmed">
        <h2>Who we are</h2>
        <p>
          This website is operated by Qode27, based in {company.location}. Registered legal entity name and address: to be confirmed. For privacy questions, contact{' '}
          <a href={company.emailHref} className="text-white underline underline-offset-4">
            {company.email}
          </a>
          .
        </p>

        <h2>Information we collect</h2>
        <p>Qode27 collects the information needed to respond to business inquiries, demo requests, consultations, and software delivery communication. This may include:</p>
        <ul>
          <li>Contact details such as your name, email address, and phone number.</li>
          <li>Company information, the product or service you are interested in, and your project timeline.</li>
          <li>Project requirements and any messages you submit through the website or share directly with our team.</li>
        </ul>

        <h2>Interactive demos</h2>
        <p>
          Product demos on this website run in your browser using sample data. Changes you make in a demo are stored only in your browser’s local storage so the
          demo can remember its state, and are not sent to Qode27. Demo pages block outgoing requests to live systems.
        </p>

        <h2>How we use information</h2>
        <p>
          We use submitted information to evaluate business fit, schedule discussions, respond to inquiries, and support commercial conversations. We do not sell
          submitted information.
        </p>

        <h2>Service providers</h2>
        <p>
          Inquiry forms may be delivered through a third-party form-handling or email provider. The specific providers used, and where data is processed: to be
          confirmed.
        </p>

        <h2>Retention and security</h2>
        <p>
          We take reasonable measures to protect submitted information and limit access to people who need it for operational, sales, or service purposes.
          Retention periods: to be confirmed.
        </p>

        <h2>Your choices</h2>
        <p>
          If you would like your information updated or removed, contact Qode27 at{' '}
          <a href={company.emailHref} className="text-white underline underline-offset-4">
            {company.email}
          </a>
          . Applicable data protection rights under Indian law or other jurisdictions: to be confirmed following legal review.
        </p>
      </LegalDocument>
    </>
  )
}
