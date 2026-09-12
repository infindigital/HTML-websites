import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import StudioLayout from '../components/studio/StudioLayout.jsx'
import TemplateGrid from '../components/studio/TemplateGrid.jsx'

// Code-split the 3D hero so Three.js loads after first paint.
const Hero3D = lazy(() => import('../components/studio/Hero3D.jsx'))
import { TEMPLATES } from '../studio/templates.js'
import { generalOrderUrl } from '../studio/whatsapp.js'
import { scrollToId } from '../studio/scroll.js'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div className={className} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ delay }}>
      {children}
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="hero">
      <Suspense fallback={<div className="hero3d hero3d--static" aria-hidden="true" />}>
        <Hero3D />
      </Suspense>
      <div className="wrap hero__content">
        <motion.p className="hero__eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          Cinematic Wedding Invitations
        </motion.p>
        <motion.h1 className="hero__title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          Your Love Story,<br /><em>Beautifully Invited.</em>
        </motion.h1>
        <motion.p className="hero__sub" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}>
          Premium cinematic wedding invitations, personalised with your names and
          delivered ready to share, just <strong>₹499</strong>.
        </motion.p>
        <motion.div className="hero__cta" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }}>
          <button type="button" className="btn btn--gold btn--lg" onClick={() => scrollToId('templates')}>View Invitations</button>
          <button type="button" className="btn btn--ghost btn--lg" onClick={() => scrollToId('how')}>How it works</button>
        </motion.div>
      </div>
      <button type="button" className="hero__scroll" aria-label="Scroll to invitations" onClick={() => scrollToId('templates')}>
        <span>SCROLL</span><span className="hero__scroll-line" />
      </button>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Choose Your Design', d: 'Browse the designs and preview any invitation with its music.' },
    { n: '02', t: 'Send Your Details', d: 'Tap Order on WhatsApp and share your names, date and venue.' },
    { n: '03', t: 'Receive Your Invitation', d: 'We personalise your design and send it back, ready to share.' },
  ]
  return (
    <section id="how" className="sec how">
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
    { i: '🎬', t: 'Cinematic Design', d: 'Motion, light and typography that feel like a wedding film.' },
    { i: '♫', t: 'Music Included', d: 'Every invitation carries a score that sets the mood.' },
    { i: '✎', t: 'Personalised', d: 'Your names, date and venue woven into the design.' },
    { i: '↗', t: 'WhatsApp Ordering', d: 'No complicated checkout. Order and personalise on chat.' },
    { i: '₹', t: 'One Simple Price', d: 'Every design is a flat ₹499. No tiers, no surprises.' },
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
    { q: 'How much does it cost?', a: 'Every design is a flat ₹499, personalised with your details and delivered ready to share.' },
    { q: 'Can you change the names, date and venue?', a: 'Yes, every invitation is fully personalised. The demo names you see are placeholders; your details take their place.' },
    { q: 'Do the invitations include music?', a: 'Yes, each design comes with a score. Music never plays until the viewer chooses to start it.' },
    { q: 'How do I share the finished invitation?', a: 'You receive a link you can send on WhatsApp and social media. It opens beautifully on phones and laptops.' },
  ]
  return (
    <section id="faq" className="sec faq">
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
          <p className="final__text">Choose your design, send us your details and let your story take the screen, for just ₹499.</p>
          <a href={generalOrderUrl()} className="btn btn--gold btn--lg" target="_blank" rel="noreferrer">Start on WhatsApp</a>
        </Reveal>
      </div>
    </section>
  )
}

export default function Landing() {
  return (
    <StudioLayout>
      <Hero />

      <section id="templates" className="sec templates">
        <div className="wrap">
          <Reveal className="sec__head">
            <p className="sec__eyebrow">The collection</p>
            <h2 className="sec__title">Four cinematic designs.<br />One for every celebration.</h2>
            <p className="sec__lead">Each design has its own world of colour, light and motion. Preview any of them, with music, then personalise it with your names.</p>
          </Reveal>
          <TemplateGrid templates={TEMPLATES} />
        </div>
      </section>

      <HowItWorks />
      <WhyUs />
      <FAQ />
      <FinalCTA />
    </StudioLayout>
  )
}
