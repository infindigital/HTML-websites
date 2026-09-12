import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StudioLayout from '../components/studio/StudioLayout.jsx'
import CategoryTiles from '../components/studio/CategoryTiles.jsx'
import TemplateGrid from '../components/studio/TemplateGrid.jsx'
import { byCategory, featuredTemplates } from '../studio/templates.js'
import { getTheme, CATEGORY_ORDER, cssVars } from '../studio/themes.js'
import { generalOrderUrl } from '../studio/whatsapp.js'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__particles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>
      <div className="wrap hero__content">
        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Cinematic Wedding Invitations
        </motion.p>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Your Love Story,<br /><em>Beautifully Invited.</em>
        </motion.h1>
        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          Premium cinematic wedding invitations designed around your celebration,
          your culture and your story.
        </motion.p>
        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <Link to="/collection" className="btn btn--gold btn--lg">Explore Invitations</Link>
          <a href="#featured" className="btn btn--ghost btn--lg">Watch a Preview</a>
        </motion.div>
      </div>
      <a href="#choose" className="hero__scroll" aria-label="Scroll down">
        <span>SCROLL</span><span className="hero__scroll-line" />
      </a>
    </section>
  )
}

function CategoryRow({ category }) {
  const theme = getTheme(category)
  const items = byCategory(category).slice(0, 3)
  return (
    <section className="sec catrow" data-religion={category} style={cssVars(category)}>
      <div className="wrap">
        <Reveal className="sec__head sec__head--row">
          <div>
            <p className="sec__eyebrow">{theme.symbol} {theme.label} Collection</p>
            <h2 className="sec__title">{theme.label} Invitations</h2>
          </div>
          <Link to={`/${category}`} className="sec__more">View all →</Link>
        </Reveal>
        <TemplateGrid templates={items} />
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Choose Your Design', d: 'Browse the collection and preview any invitation with its music.' },
    { n: '02', t: 'Send Your Details', d: 'Tap Order on WhatsApp and share your names, date and venue.' },
    { n: '03', t: 'Receive Your Invitation', d: 'We personalise your design and send it back, ready to share.' },
  ]
  return (
    <section className="sec how">
      <div className="wrap">
        <Reveal className="sec__head">
          <p className="sec__eyebrow">How it works</p>
          <h2 className="sec__title">Three steps to your invitation</h2>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} className="step" delay={i * 0.08}>
              <span className="step__num">{s.n}</span>
              <h3 className="step__title">{s.t}</h3>
              <p className="step__desc">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  const feats = [
    { i: '🎬', t: 'Cinematic Video', d: 'Motion, light and typography that feel like a wedding film.' },
    { i: '♫', t: 'Music Included', d: 'Every invitation carries a score that sets the mood.' },
    { i: '✦', t: 'Premium Design', d: 'Culturally intentional design, crafted detail by detail.' },
    { i: '✎', t: 'Personalised Names', d: 'Your names, date and venue woven into the design.' },
    { i: '↗', t: 'WhatsApp Ordering', d: 'No complicated checkout — order and personalise on chat.' },
  ]
  return (
    <section className="sec why">
      <div className="wrap">
        <Reveal className="sec__head">
          <p className="sec__eyebrow">Why our invitations</p>
          <h2 className="sec__title">Designed for the moments that matter.</h2>
        </Reveal>
        <div className="why__grid">
          {feats.map((f, i) => (
            <Reveal key={f.t} className="feature" delay={i * 0.06}>
              <span className="feature__icon" aria-hidden="true">{f.i}</span>
              <h3 className="feature__title">{f.t}</h3>
              <p className="feature__desc">{f.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const qs = [
    { q: 'How do I order?', a: 'Choose a design, tap “Order on WhatsApp”, and share your names, date and venue. We personalise the invitation and send it back to you.' },
    { q: 'Can you change the names, date and venue?', a: 'Yes — every invitation is fully personalised. The demo names you see are placeholders; your details take their place.' },
    { q: 'Do the invitations include music?', a: 'Yes, each design comes with a score. Music never plays until the viewer chooses to start it.' },
    { q: 'How do I share the finished invitation?', a: 'You receive a link you can send on WhatsApp and social media — it opens beautifully on phones and laptops.' },
    { q: 'Which languages are supported?', a: 'The Muslim collection’s live experience supports English, Kannada, Hindi and Arabic. Tell us what you need for your design.' },
  ]
  return (
    <section className="sec faq">
      <div className="wrap wrap--narrow">
        <Reveal className="sec__head">
          <p className="sec__eyebrow">Questions</p>
          <h2 className="sec__title">Good to know</h2>
        </Reveal>
        <div className="faq__list">
          {qs.map((item) => (
            <details key={item.q} className="faq__item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="sec final">
      <div className="wrap wrap--narrow final__inner">
        <Reveal>
          <h2 className="final__title">Ready to make your invitation unforgettable?</h2>
          <p className="final__text">
            Choose your design, send us your details and let your story take the screen.
          </p>
          <a href={generalOrderUrl()} className="btn btn--gold btn--lg" target="_blank" rel="noreferrer">
            Start on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default function Landing() {
  return (
    <StudioLayout>
      <Hero />

      <section id="choose" className="sec choose">
        <div className="wrap">
          <Reveal className="sec__head">
            <p className="sec__eyebrow">Choose your celebration</p>
            <h2 className="sec__title">Three traditions, each its own world.</h2>
            <p className="sec__lead">
              Every collection has its own visual language — colour, ornament and light —
              so your invitation feels culturally intentional, never generic.
            </p>
          </Reveal>
          <CategoryTiles />
        </div>
      </section>

      <section id="featured" className="sec featured">
        <div className="wrap">
          <Reveal className="sec__head">
            <p className="sec__eyebrow">Featured invitations</p>
            <h2 className="sec__title">Not just an invitation.<br />The first moment of your celebration.</h2>
            <p className="sec__lead">
              Choose a design that feels like you — then let us turn it into a
              personalised cinematic invitation.
            </p>
          </Reveal>
          <TemplateGrid templates={featuredTemplates()} />
        </div>
      </section>

      {CATEGORY_ORDER.map((c) => (
        <CategoryRow key={c} category={c} />
      ))}

      <HowItWorks />
      <WhyUs />
      <FAQ />
      <FinalCTA />
    </StudioLayout>
  )
}
