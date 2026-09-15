import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import StudioLayout from '../components/studio/StudioLayout.jsx'
import TemplateGrid from '../components/studio/TemplateGrid.jsx'
import VideoShowcase from '../components/studio/VideoShowcase.jsx'
import { TEMPLATES } from '../studio/templates.js'
import { cssVars } from '../studio/themes.js'
import studio from '../studio/config.js'
import { generalOrderUrl } from '../studio/whatsapp.js'
import { scrollToId } from '../studio/scroll.js'

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function Reveal({ children, className, delay = 0, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ delay }}>
      {children}
    </Tag>
  )
}

// A fanned deck of the collection, echoing an editorial cover's card fan.
function HeroDeck() {
  return (
    <div className="hero__deck" aria-label="The collection">
      {TEMPLATES.slice(0, 3).map((t) => (
        <Link
          key={t.id}
          to={t.inviteHref}
          className="deckcard"
          data-theme-id={t.theme}
          style={cssVars(t.theme)}
          aria-label={`Open the ${t.title} invitation`}
        >
          <img className="deckcard__img" src={t.poster} alt={`${t.title} — ${t.subtitle}`} loading="eager" decoding="async" />
        </Link>
      ))}
    </div>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  return (
    <section className="hero" ref={ref}>
      <div className="hero__wash" aria-hidden="true" />
      <motion.div className="hero__inner" style={{ y, opacity }}>
        <motion.p className="hero__eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <span className="spark">{studio.brandName}</span> &nbsp;—&nbsp; Presents
        </motion.p>
        <motion.h1 className="hero__title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <span className="line">The Art</span>
          <span className="line"><em>of the</em> Invitation</span>
        </motion.h1>
        <motion.p className="hero__sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.42 }}>
          Cinematic wedding invitations — personalised with your names, scored with
          music and delivered ready to share, from <strong>{studio.currency}{studio.price}</strong>.
        </motion.p>
        <motion.div className="hero__cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.54 }}>
          <button type="button" className="btn btn--ink btn--lg" onClick={() => scrollToId('templates')}>View the collection</button>
          <a className="hero__cta-text" href={generalOrderUrl()} target="_blank" rel="noreferrer">Order on WhatsApp →</a>
        </motion.div>
      </motion.div>

      <motion.div style={{ width: '100%' }} initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.66, ease: [0.22, 1, 0.36, 1] }}>
        <HeroDeck />
      </motion.div>

      <button type="button" className="hero__scroll" aria-label="Scroll to the collection" onClick={() => scrollToId('templates')}>
        <span>Scroll</span><span className="hero__scroll-line" />
      </button>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Choose your design', d: 'Browse the collection and preview any invitation, with its film and score.' },
    { n: '02', t: 'Send your details', d: 'Tap Order on WhatsApp and share your names, date and venue.' },
    { n: '03', t: 'Receive your invitation', d: 'We personalise your design and send it back, ready to share.' },
  ]
  return (
    <section id="how" className="sec how sec--center">
      <div className="wrap">
        <Reveal className="sec__head">
          <p className="sec__eyebrow">The process</p>
          <h2 className="sec__title">Three steps to <em>your invitation.</em></h2>
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
    { t: 'Cinematic design', d: 'Motion, light and typography that feel like a wedding film.' },
    { t: 'Music included', d: 'Every invitation carries a score that sets the mood.' },
    { t: 'Personalised', d: 'Your names, date and venue woven into the design.' },
    { t: 'WhatsApp ordering', d: 'No complicated checkout — order and personalise on chat.' },
    { t: 'One simple price', d: `Every design is a flat ${studio.currency}${studio.price}. No tiers, no surprises.` },
  ]
  return (
    <section className="sec why sec--tint">
      <div className="wrap">
        <Reveal className="sec__head">
          <p className="sec__eyebrow">Why Wedora</p>
          <h2 className="sec__title">Designed for the moments <em>that matter.</em></h2>
        </Reveal>
        <div className="why__grid">
          {feats.map((f, i) => (
            <Reveal key={f.t} className="feature" delay={i * 0.05}>
              <span className="feature__icon" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="feature__title">{f.t}</h3>
                <p className="feature__desc">{f.d}</p>
              </div>
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
    { q: 'How much does it cost?', a: `Every design is a flat ${studio.currency}${studio.price}, personalised with your details and delivered ready to share.` },
    { q: 'Can you change the names, date and venue?', a: 'Yes, every invitation is fully personalised. The demo names you see are placeholders; your details take their place.' },
    { q: 'Do the invitations include music?', a: 'Yes, each design comes with a score. Music never plays until the viewer chooses to start it.' },
    { q: 'How do I share the finished invitation?', a: 'You receive a link you can send on WhatsApp and social media. It opens beautifully on phones and laptops.' },
  ]
  return (
    <section id="faq" className="sec faq">
      <div className="wrap wrap--narrow">
        <Reveal className="sec__head">
          <p className="sec__eyebrow">Questions</p>
          <h2 className="sec__title">Good <em>to know.</em></h2>
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
      <div className="wrap wrap--narrow">
        <Reveal>
          <h2 className="final__title">Your story deserves <em>an entrance.</em></h2>
          <p className="final__text">Choose your design, send us your details, and let your celebration open like a film — from {studio.currency}{studio.price}.</p>
          <a href={generalOrderUrl()} className="btn btn--gold btn--lg" target="_blank" rel="noreferrer">Start on WhatsApp</a>
        </Reveal>
      </div>
    </section>
  )
}

export default function Landing() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <StudioLayout>
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <Hero />

      <section id="templates" className="sec templates sec--center">
        <div className="wrap">
          <Reveal className="sec__head">
            <p className="sec__eyebrow">The collection</p>
            <h2 className="sec__title">Three cinematic worlds, <em>one for every celebration.</em></h2>
            <p className="sec__lead">Muslim, Hindu and Christian — each with its own colour, light and motion. Preview any world, then personalise it with your names.</p>
          </Reveal>
          <TemplateGrid templates={TEMPLATES} />
        </div>
      </section>

      <section id="films" className="sec films sec--center sec--tint">
        <div className="wrap">
          <Reveal className="sec__head">
            <p className="sec__eyebrow">Cinematic films</p>
            <h2 className="sec__title">Wedding films that play <em>like a trailer.</em></h2>
            <p className="sec__lead">Prefer a film? Each design also comes as a cinematic video invitation — your names, date and venue woven into a shareable trailer for your day.</p>
          </Reveal>
        </div>
        <VideoShowcase templates={TEMPLATES} />
      </section>

      <HowItWorks />
      <WhyUs />
      <FAQ />
      <FinalCTA />
    </StudioLayout>
  )
}
