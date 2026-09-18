import { Fragment, useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import StudioLayout from '../components/studio/StudioLayout.jsx'
import TemplateGrid from '../components/studio/TemplateGrid.jsx'
import { LineReveal, Reveal, Stagger, StaggerItem, MagneticButton } from '../components/studio/Reveal.jsx'
import { OrderButton } from '../components/studio/OrderButton.jsx'
import { TEMPLATES } from '../studio/templates.js'
import { cssVars } from '../studio/themes.js'
import studio from '../studio/config.js'
import { scrollToId } from '../studio/scroll.js'
import { EASE, DUR, SPRING, fadeUp } from '../studio/motion.js'

const MLink = motion(Link)

// =====================================================================
//  HERO — an editorial cover. A choreographed load sequence, a masthead
//  that parallaxes away on scroll, and a fanned 3D deck that spreads and
//  lifts as the page moves, reacting subtly to the pointer.
// =====================================================================

// Per-card choreography for the fanned deck. Base fan + how each card
// spreads / drifts / responds to depth as the hero scrolls away.
const DECK = [
  { rot: -10, spreadRot: -8, spreadX: -74, driftY: -34, y: 16, depth: 1.5, z: 2 },
  { rot: 2, spreadRot: 0, spreadX: 2, driftY: -74, y: -10, depth: 0.8, z: 4 },
  { rot: 10, spreadRot: 8, spreadX: 74, driftY: -34, y: 16, depth: 1.5, z: 3 },
]

function DeckCard({ t, cfg, index, progress, mx, my, reduced, hovered, setHovered }) {
  // Scroll + pointer driven transforms (static when reduced-motion).
  const rotate = useTransform(progress, [0, 1], [cfg.rot, cfg.rot + cfg.spreadRot])
  const rotateY = useTransform(mx, (m) => m * cfg.depth * 9)
  const x = useTransform([progress, mx], ([p, m]) => p * cfg.spreadX + m * cfg.depth * 24)
  const y = useTransform([progress, my], ([p, m]) => cfg.y + p * cfg.driftY + m * cfg.depth * 16)
  const scale = useTransform(progress, [0, 1], [1, 0.9])

  const midStyle = reduced
    ? { transform: `rotate(${cfg.rot}deg) translateY(${cfg.y}px)` }
    : { rotate, rotateY, x, y, scale }

  return (
    <motion.div
      className="deckcard-outer"
      style={{ zIndex: hovered === index ? 30 : cfg.z }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 130, scale: 0.82 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE.editorial, delay: 0.55 + index * 0.13 }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(-1)}
    >
      <motion.div className="deckcard-mid" style={midStyle}>
        <MLink
          to={t.inviteHref}
          className="deckcard"
          data-theme-id={t.theme}
          style={cssVars(t.theme)}
          aria-label={`Open the ${t.title} invitation`}
          whileHover={reduced ? undefined : { y: -18, scale: 1.05 }}
          transition={{ duration: 0.5, ease: EASE.enter }}
        >
          <span className="deckcard__glow" aria-hidden="true" />
          <img
            className="deckcard__img"
            src={t.poster}
            alt={`${t.title}, ${t.subtitle} digital wedding invitation`}
            loading="eager"
            decoding="async"
          />
        </MLink>
      </motion.div>
    </motion.div>
  )
}

function HeroDeck({ progress, mx, my, reduced }) {
  const [hovered, setHovered] = useState(-1)
  return (
    <div className="hero__deck" aria-label="The collection">
      {TEMPLATES.slice(0, 3).map((t, i) => (
        <DeckCard
          key={t.id}
          t={t}
          cfg={DECK[i]}
          index={i}
          progress={progress}
          mx={mx}
          my={my}
          reduced={reduced}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  )
}

// A canvas the cursor paints colour onto as it moves through the hero — a
// playful, rainbow gradient trail that softly dissolves. Blends as translucent
// stains on the white ground (see .hero__paint). Motion-safe only.
function HeroPaint({ reduced }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reduced) return undefined
    const canvas = ref.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return undefined
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let running = true
    let raf = 0
    let last = null
    let hue = Math.random() * 360
    let R = 92
    const stamps = []
    const inside = (x, y) => x >= 0 && y >= 0 && x <= w && y <= h

    const resize = () => {
      const r = parent.getBoundingClientRect()
      w = r.width
      h = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // blob size scales with the hero width (tighter on phones)
      R = Math.max(46, Math.min(96, w * 0.1))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const onMove = (e) => {
      const r = parent.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (x < 0 || y < 0 || x > w || y > h) {
        last = null
        return
      }
      if (last) {
        const dx = x - last.x
        const dy = y - last.y
        const dist = Math.hypot(dx, dy)
        const n = Math.max(1, Math.floor(dist / 13))
        for (let i = 1; i <= n; i += 1) {
          stamps.push({ x: last.x + (dx * i) / n, y: last.y + (dy * i) / n, hue })
          hue = (hue + 4) % 360
        }
      } else {
        stamps.push({ x, y, hue })
      }
      last = { x, y }
    }
    const onLeave = () => {
      last = null
    }
    // A tap / press (touch or mouse) bursts a small colourful splash, so the
    // effect is playful on phones where there is no hovering cursor.
    const onDown = (e) => {
      const r = parent.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (!inside(x, y)) return
      const n = 7
      for (let i = 0; i < n; i += 1) {
        const a = (i / n) * Math.PI * 2
        const rr = R * 0.5 * Math.random()
        stamps.push({ x: x + Math.cos(a) * rr, y: y + Math.sin(a) * rr, hue })
        hue = (hue + 20) % 360
      }
      stamps.push({ x, y, hue })
      last = { x, y }
    }
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerdown', onDown)
    parent.addEventListener('pointerleave', onLeave)
    parent.addEventListener('pointerup', onLeave)
    parent.addEventListener('pointercancel', onLeave)

    const tick = () => {
      if (!running) return
      // fade the existing paint gently back toward transparent (reveals white)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.03)'
      ctx.fillRect(0, 0, w, h)
      // stamp new soft graphite blobs where the cursor moved — a subtle,
      // monochrome "smudge" on the ivory ground (no colour, kept premium).
      ctx.globalCompositeOperation = 'source-over'
      for (let i = 0; i < stamps.length; i += 1) {
        const s = stamps[i]
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, R)
        const col = 'rgba(38, 36, 32,'
        g.addColorStop(0, `${col}0.09)`)
        g.addColorStop(0.5, `${col}0.04)`)
        g.addColorStop(1, `${col}0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(s.x, s.y, R, 0, Math.PI * 2)
        ctx.fill()
      }
      stamps.length = 0
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerdown', onDown)
      parent.removeEventListener('pointerleave', onLeave)
      parent.removeEventListener('pointerup', onLeave)
      parent.removeEventListener('pointercancel', onLeave)
    }
  }, [reduced])

  if (reduced) return null
  return <canvas ref={ref} className="hero__paint" aria-hidden="true" />
}

// -----------------------------------------------------------------------
//  HERO TITLE — a cinematic, editorial reveal. Each word rises out of a soft
//  blur into focus, staggered, once on page load. Motion-safe: reduced motion
//  collapses it to a clean fade with no blur or movement, and there is no
//  layout shift (only transform / filter / opacity animate).
// -----------------------------------------------------------------------
const HERO_LINES = [
  ['Your', 'Invitation,'],
  ['One', <em key="beautiful" className="hero__em">Beautiful</em>, 'Link'],
]

function HeroTitle({ reduced }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } },
  }
  const word = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease: EASE.enter } } }
    : {
        hidden: { opacity: 0, y: '0.42em', filter: 'blur(9px)', scale: 1.05 },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          transition: { duration: 1.05, ease: EASE.editorial },
        },
      }
  return (
    <motion.h1 className="hero__title" variants={container} initial="hidden" animate="show">
      {HERO_LINES.map((line, i) => (
        <span className="hero__line" key={i}>
          {line.map((w, j) => (
            <Fragment key={j}>
              <motion.span className="hero__word" variants={word}>
                {w}
              </motion.span>
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

  // Pointer parallax (desktop only; springed for weight).
  const pmx = useMotionValue(0)
  const pmy = useMotionValue(0)
  const mx = useSpring(pmx, SPRING.silk)
  const my = useSpring(pmy, SPRING.silk)
  const onMove = (e) => {
    if (reduced) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    pmx.set((e.clientX - r.left) / r.width - 0.5)
    pmy.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    pmx.set(0)
    pmy.set(0)
  }

  return (
    <section className="hero" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div className="hero__wash" aria-hidden="true" style={{ y: washY }} />
      <HeroPaint reduced={reduced} />
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

      <HeroDeck progress={scrollYProgress} mx={mx} my={my} reduced={reduced} />

      <motion.button
        type="button"
        className="hero__scroll"
        aria-label="Scroll to the collection"
        onClick={() => scrollToId('templates')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.base, delay: 1.15 }}
      >
        <span>Scroll</span>
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
            <Reveal className="sec__lead" as="p" delay={0.1}>
              Every celebration deserves its own atmosphere. Explore invitation experiences designed to turn a simple link into a beautiful first impression.
            </Reveal>
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
