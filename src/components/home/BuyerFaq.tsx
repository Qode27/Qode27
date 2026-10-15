import { FiArrowRight, FiPlay } from 'react-icons/fi'
import { buyerFaqs } from '../../data/company'
import Button from '../ui/Button'
import FaqList from '../ui/FaqList'
import Reveal from '../ui/Reveal'

export default function BuyerFaq() {
  return (
    <section className="section rule-top" aria-labelledby="buyer-faq-heading">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Before you decide</p>
          <h2 id="buyer-faq-heading" className="display-md mt-5">
            The questions every buyer asks us.
          </h2>
          <p className="lede mt-5 max-w-md">Straight answers on how we work, what it costs to get started, and what happens after launch.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href="/contact">
              Discuss Your Project <FiArrowRight aria-hidden="true" />
            </Button>
            <Button href="/demo" variant="secondary">
              <FiPlay aria-hidden="true" /> Try a live demo
            </Button>
          </div>
        </Reveal>
        <FaqList items={[...buyerFaqs]} />
      </div>
    </section>
  )
}
