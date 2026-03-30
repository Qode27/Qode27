import { motion as Motion } from 'framer-motion'
import Container from '../components/ui/Container'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { products } from '../data/site'

export default function ProductsPage() {
  return (
    <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
      <section className="section-spacing pt-12">
        <Container>
          <SectionHeader
            eyebrow="Products"
            title="A focused SaaS portfolio for operationally intense teams."
            description="Qode27 products are built to look premium, feel fast, and drive real process improvements across healthcare, people operations, and internal automation."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <Reveal key={product.slug}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </Motion.div>
  )
}
