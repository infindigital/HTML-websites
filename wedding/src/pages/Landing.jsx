import { Fragment, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import StudioLayout from '../components/studio/StudioLayout.jsx'
import TemplateGrid from '../components/studio/TemplateGrid.jsx'
import { LineReveal, Reveal, Stagger, StaggerItem, MagneticButton } from '../components/studio/Reveal.jsx'
import { OrderButton } from '../components/studio/OrderButton.jsx'
import { TEMPLATES } from '../studio/templates.js'
import studio from '../studio/config.js'
import { scrollToId } from '../studio/scroll.js'
import { EASE, DUR, SPRING, fadeUp } from '../studio/motion.js'

// =====================================================================
//  HERO — an editorial cover. A choreographed load sequence and a masthead
//  that parallaxes away on scroll, over a living, colour-painted ground.
// =====================================================================

// -----------------------------------------------------------------------
//  HERO TITLE — a cinematic, editorial reveal. Each word rises out of a soft
//  blur into focus, staggered, once on page load. Motion-safe: reduced motion
//  collapses it to a clean fade with no blur or movement, and there is no
//  layout shift (only transform / filter / opacity animate).
// -----------------------------------------------------------------------
const HERO_LABEL = 'Your Invitation, One Beautiful Link'
const HERO_LINES = [
  [{ t: 'Your' }, { t: 'Invitation,' }],
  [{ t: 'One' }, { t: 'Beautiful', em: true }, { t: 'Link' }],
]

function HeroTitle({ reduced }) {
  // A per-letter cinematic cascade: each character hinges up from a tilt,
  // rising out of a soft blur into focus, in sequence across the headline.
  // Runs once on load; reduced motion collapses it to a clean per-letter fade
  // with no 3D or blur. Only transforms/filter/opacity animate, so there is no
  // layout shift, and the H1's accessible name is provided verbatim.
  const container = reduced
    ? { hidden: {}, show: { transition: { staggerChildren: 0, delayChildren: 0 } } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.026, delayChildren: 0.32 } } }
  const charV = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.35, ease: EASE.enter } } }
    : {
        hidden: { opacity: 0, y: '0.7em', z: -150, rotateX: -78, filter: 'blur(8px)', transformPerspective: 900 },
        show: {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          transformPerspective: 900,
          transition: { duration: 0.9, ease: EASE.editorial },
        },
      }
  return (
    <motion.h1
      className="hero__title"
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={HERO_LABEL}
    >
      {HERO_LINES.map((line, i) => (
        <span className="hero__line" key={i} aria-hidden="true">
          {line.map((w, j) => (
            <Fragment key={j}>
              <span className={`hero__word${w.em ? ' hero__em' : ''}`}>
                {[...w.t].map((c, k) => (
                  <motion.span className="hero__char" key={k} variants={charV}>
                    {c}
                  </motion.span>
                ))}
              </span>
              {j < line.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}

function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Masthead parallaxes up and fades as the hero leaves.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140])
  const innerOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0])
  const washY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60])

  return (
    <section className="hero" ref={ref}>
      {/* colour field behind the masthead: static — it drifts only with scroll */}
      <motion.div className="hero__wash" aria-hidden="true" style={{ y: washY }} />
      <motion.div className="hero__inner" style={{ y: titleY, opacity: innerOpacity }}>
        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, ease: EASE.enter, delay: 0.15 }}
        >
          The Digital Invitation Studio
        </motion.p>

        <HeroTitle reduced={reduced} />

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, ease: EASE.enter, delay: 0.95 }}
        >
          Beautifully crafted digital invitations, made to be opened, shared and remembered.
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, ease: EASE.enter, delay: 1.08 }}
        >
          <MagneticButton>
            <button type="button" className="btn btn--ink btn--lg" onClick={() => scrollToId('templates')}>
              Explore the Collections
            </button>
          </MagneticButton>
          <MagneticButton>
            <OrderButton large label={`Order ${studio.currency}${studio.price}`} />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        className="hero__scroll"
        aria-label="Scroll to the collection"
        onClick={() => scrollToId('templates')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.base, delay: 1.15 }}
      >
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-line" />
      </motion.button>
    </section>
  )
}

// =====================================================================
//  HOW IT WORKS — sticky storytelling. A pinned rail (eyebrow, title,
//  a progress track that fills 01 → 02 → 03) while the step panels scroll
//  past it, so the page feels like it moves around the composition.
// =====================================================================
const STEPS = [
  { n: '01', t: 'Choose Your Invitation', d: 'Explore the collection and select the design that fits your celebration. Preview exactly what your guests will see.' },
  { n: '02', t: 'Make It Yours', d: 'Share your names, date and venue on WhatsApp and we personalise the invitation. No forms, no checkout, just a conversation.' },
  { n: '03', t: 'Share One Beautiful Link', d: 'Receive your invitation as a single link and share it with your guests. They open the link to experience your invitation.' },
]

function HowItWorks() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 45%'] })
  const fill = useSpring(scrollYProgress, SPRING.silk)
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(v < 0.34 ? 0 : v < 0.68 ? 1 : 2)
  })

  return (
    <section id="how" className="sec how" ref={ref}>
      <div className="wrap how__grid">
        <div className="how__rail">
          <Reveal className="sec__eyebrow" as="p">How it works</Reveal>
          <LineReveal
            as="h2"
            className="sec__title how__title"
            each={0.12}
            lines={['From Idea to', <em key="e">Invitation Link.</em>]}
          />
          <div className="how__track" aria-hidden="true">
            <span className="how__track-line" />
            {!reduced && <motion.span className="how__track-fill" style={{ scaleY: fill }} />}
            {STEPS.map((s, i) => (
              <div key={s.n} className={`how__marker${active >= i ? ' is-on' : ''}`}>
                <span className="how__marker-dot" />
                <span className="how__marker-n">{s.n}</span>
                <span className="how__marker-t">{s.t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="how__panels">
          {STEPS.map((s) => (
            <Reveal key={s.n} className="how__panel" variant={fadeUp} amount={0.4}>
              <span className="how__panel-n">{s.n}</span>
              <h3 className="how__panel-t">{s.t}</h3>
              <p className="how__panel-d">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// =====================================================================
//  WHY — a feature index that reveals row by row over a warm colour wash.
// =====================================================================
function WhyUs() {
  const feats = [
    { t: 'One beautiful link', d: 'Your finished invitation arrives as a single link, ready to share with every guest.' },
    { t: 'Editorial design', d: 'Motion, light and typography, crafted with the care of a wedding film.' },
    { t: 'Music included', d: 'Every invitation carries a score that sets the mood the moment it opens.' },
    { t: 'Personalised', d: 'Your names, date and venue woven into the design.' },
    { t: 'WhatsApp ordering', d: 'No complicated checkout. Order and personalise over a simple chat.' },
    { t: 'One simple price', d: `Every design is a flat ${studio.currency}${studio.price}. No tiers, no surprises.` },
  ]
  return (
    <section id="about" className="sec why sec--tint">
      <span className="sec__glow sec__glow--rose" aria-hidden="true" />
      <div className="wrap">
        <div className="sec__head">
          <Reveal className="sec__eyebrow" as="p">Why IN/FIN Invite</Reveal>
          <LineReveal
            as="h2"
            className="sec__title"
            lines={['Designed for the moments', <em key="e">that matter.</em>]}
          />
        </div>
        <Stagger className="why__grid" each={0.08} amount={0.15}>
          {feats.map((f, i) => (
            <StaggerItem key={f.t} className="feature" variant={fadeUp}>
              <span className="feature__icon" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="feature__title">{f.t}</h3>
                <p className="feature__desc">{f.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

// =====================================================================
//  FAQ
// =====================================================================
function FAQ() {
  const qs = [
    { q: 'What exactly do I receive?', a: 'A beautiful digital invitation experience, delivered as one link. You share the link with your guests, and they open it to experience your invitation.' },
    { q: 'How do I order?', a: `Choose a design, tap Order ${studio.currency}${studio.price}, and share your names, date and venue on WhatsApp. We personalise the invitation and send you your link.` },
    { q: 'How much does it cost?', a: `Every design is a flat ${studio.currency}${studio.price}, personalised with your details and delivered as a link ready to share.` },
    { q: 'Can you change the names, date and venue?', a: 'Yes, every invitation is fully personalised. The demo names you see are placeholders; your details take their place.' },
    { q: 'Do the invitations include music?', a: 'Yes, each design comes with a score. Music never plays until the viewer chooses to start it.' },
    { q: 'How do I share the finished invitation?', a: 'You receive one link to share on WhatsApp, Instagram and beyond. It opens beautifully on phones and laptops.' },
  ]
  return (
    <section id="faq" className="sec faq">
      <div className="wrap wrap--narrow">
        <div className="sec__head">
          <Reveal className="sec__eyebrow" as="p">Questions</Reveal>
          <LineReveal as="h2" className="sec__title" lines={['Good', <em key="e">to know.</em>]} />
        </div>
        <Stagger className="faq__list" each={0.07} amount={0.1}>
          {qs.map((item) => (
            <StaggerItem key={item.q} as="details" className="faq__item" variant={fadeUp}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

// =====================================================================
//  FINAL CTA — a dark curtain that rises over the page on entry.
// =====================================================================
function FinalCTA() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.92, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 64, 0])

  return (
    <motion.section className="sec final" ref={ref} style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius }}>
      <span className="sec__glow sec__glow--gold" aria-hidden="true" />
      <motion.div className="wrap wrap--narrow" style={{ scale }}>
        <LineReveal as="h2" className="final__title" lines={['Your story deserves', <em key="e">an entrance.</em>]} />
        <Reveal className="final__text" as="p" delay={0.1}>
          Choose your design, share your details, and receive one beautiful link to open your celebration, for {studio.currency}{studio.price}.
        </Reveal>
        <Reveal delay={0.18}>
          <MagneticButton>
            <OrderButton large label={`Order ${studio.currency}${studio.price}`} />
          </MagneticButton>
        </Reveal>
      </motion.div>
    </motion.section>
  )
}

// =====================================================================
//  VALUE BAND — a quiet editorial strip that states the model plainly:
//  the product is a link to a digital invitation experience, not a file.
// =====================================================================
function ValueBand() {
  return (
    <section className="sec valueband sec--center">
      <div className="wrap wrap--narrow">
        <LineReveal
          as="p"
          className="valueband__line"
          each={0.12}
          lines={['One link.', <em key="e">One beautiful first impression.</em>]}
        />
        <Reveal className="valueband__sub" as="p" delay={0.1}>
          Not a video file to download, but a digital invitation experience your guests open, share and remember.
        </Reveal>
      </div>
    </section>
  )
}

// =====================================================================
//  PAGE
// =====================================================================
export default function Landing() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <StudioLayout>
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <Hero />

      <section id="templates" className="sec templates sec--center">
        <span className="sec__glow sec__glow--emerald" aria-hidden="true" />
        <div className="wrap">
          <div className="sec__head">
            <Reveal className="sec__eyebrow" as="p">Collections</Reveal>
            <LineReveal
              as="h2"
              className="sec__title"
              lines={['Explore the', <em key="e">Collections.</em>]}
            />
          </div>
          <TemplateGrid templates={TEMPLATES} />
        </div>
      </section>

      <ValueBand />

      <HowItWorks />
      <WhyUs />
      <FAQ />
      <FinalCTA />
    </StudioLayout>
  )
}
