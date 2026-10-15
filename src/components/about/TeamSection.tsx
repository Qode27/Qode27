import { team } from '../../data/proof'
import Reveal from '../ui/Reveal'
import SectionIntro from '../ui/SectionIntro'

/** The people behind Qode27. Renders nothing until team members are added in src/data/proof.ts. */
export default function TeamSection() {
  if (team.length === 0) return null
  return (
    <section className="section rule-top">
      <div className="section-shell">
        <SectionIntro eyebrow="People" title="The team you will work with." />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <li key={member.name}>
              <Reveal delay={index * 0.05} className="surface h-full p-7">
                {member.photo ? <img src={member.photo} alt={member.name} className="h-16 w-16 rounded-full object-cover" loading="lazy" /> : null}
                <h3 className="mt-5 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-[var(--color-accent)]">{member.role}</p>
                <p className="mt-3 leading-7 text-[var(--color-muted)]">{member.bio}</p>
                {member.linkedin ? (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="link-arrow mt-4 text-sm">
                    LinkedIn
                  </a>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
