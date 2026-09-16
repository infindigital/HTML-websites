import { useRef, useState, useEffect } from 'react'
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
import VideoShowcase from '../components/studio/VideoShowcase.jsx'
import { LineReveal, Reveal, Stagger, StaggerItem, MagneticButton } from '../components/studio/Reveal.jsx'
import { TEMPLATES } from '../studio/templates.js'
import { cssVars } from '../studio/themes.js'
import studio from '../studio/config.js'
import { generalOrderUrl } from '../studio/whatsapp.js'
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
            alt={`${t.title}, ${t.subtitle}`}
            loading="eager"
            decoding="async"
          />
          <span className="deckcard__tag">{t.religionLabel}</span>
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
    const stamps = []

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
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)

    const tick = () => {
      if (!running) return
      // fade the existing paint gently back toward transparent (reveals white)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.03)'
      ctx.fillRect(0, 0, w, h)
      // stamp new soft coloured blobs where the cursor moved
      ctx.globalCompositeOperation = 'source-over'
      for (let i = 0; i < stamps.length; i += 1) {
        const s = stamps[i]
        const R = 92
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, R)
        const col = `hsla(${s.hue}, 92%, 58%,`
        g.addColorStop(0, `${col}0.24)`)
        g.addColorStop(0.5, `${col}0.10)`)
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
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null
  return <canvas ref={ref} className="hero__paint" aria-hidden="true" />
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
          <span className="spark">{studio.brandName}</span>&nbsp;&nbsp;·&nbsp;&nbsp;Presents
        </motion.p>

        <LineReveal
          as="h1"
          className="hero__title"
          trigger="load"
          delay={0.28}
          each={0.14}
          lines={['The Art', <>
            <em>of the</em> Invitation
          </>]}
        />

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, ease: EASE.enter, delay: 0.72 }}
        >
          Cinematic wedding invitations, personalised with your names, scored with
          music and delivered ready to share, from <strong>{studio.currency}{studio.price}</strong>.
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, ease: EASE.enter, delay: 0.86 }}
        >
          <MagneticButton>
            <button type="button" className="btn btn--ink btn--lg" onClick={() => scrollToId('templates')}>
              View the collection
            </button>
          </MagneticButton>
          <a className="hero__cta-text" href={generalOrderUrl()} target="_blank" rel="noreferrer">
            Order on WhatsApp →
          </a>
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
  { n: '01', t: 'Choose your design', d: 'Browse the collection and preview any invitation, with its film and score. Every world is fully personalised for your celebration.' },
  { n: '02', t: 'Send your details', d: 'Tap Order on WhatsApp and share your names, date and venue. No forms, no checkout, just a conversation.' },
  { n: '03', t: 'Receive your invitation', d: 'We weave your details into the design and send it back, ready to share on WhatsApp, Instagram and beyond.' },
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
          <Reveal className="sec__eyebrow" as="p">The process</Reveal>
          <LineReveal
            as="h2"
            className="sec__title how__title"
            each={0.12}
            lines={['Three steps to', <em key="e">your invitation.</em>]}
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
    { t: 'Cinematic design', d: 'Motion, light and typography that feel like a wedding film.' },
    { t: 'Music included', d: 'Every invitation carries a score that sets the mood.' },
    { t: 'Personalised', d: 'Your names, date and venue woven into the design.' },
    { t: 'WhatsApp ordering', d: 'No complicated checkout, just order and personalise on chat.' },
    { t: 'One simple price', d: `Every design is a flat ${studio.currency}${studio.price}. No tiers, no surprises.` },
  ]
  return (
    <section className="sec why sec--tint">
      <span className="sec__glow sec__glow--rose" aria-hidden="true" />
      <div className="wrap">
        <div className="sec__head">
          <Reveal className="sec__eyebrow" as="p">Why Wedora</Reveal>
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
    { q: 'How do I order?', a: 'Choose a design, tap “Order on WhatsApp”, and share your names, date and venue. We personalise the invitation and send it back to you.' },
    { q: 'How much does it cost?', a: `Every design is a flat ${studio.currency}${studio.price}, personalised with your details and delivered ready to share.` },
    { q: 'Can you change the names, date and venue?', a: 'Yes, every invitation is fully personalised. The demo names you see are placeholders; your details take their place.' },
    { q: 'Do the invitations include music?', a: 'Yes, each design comes with a score. Music never plays until the viewer chooses to start it.' },
    { q: 'How do I share the finished invitation?', a: 'You receive a link you can send on WhatsApp and social media. It opens beautifully on phones and laptops.' },
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
          Choose your design, send us your details, and let your celebration open like a film, from {studio.currency}{studio.price}.
        </Reveal>
        <Reveal delay={0.18}>
          <MagneticButton>
            <a href={generalOrderUrl()} className="btn btn--gold btn--lg" target="_blank" rel="noreferrer">
              Start on WhatsApp
            </a>
          </MagneticButton>
        </Reveal>
      </motion.div>
    </motion.section>
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
            <Reveal className="sec__eyebrow" as="p">The collection</Reveal>
            <LineReveal
              as="h2"
              className="sec__title"
              lines={['Three cinematic worlds,', <em key="e">one for every celebration.</em>]}
            />
            <Reveal className="sec__lead" as="p" delay={0.1}>
              Muslim, Hindu and Christian, each with its own colour, light and motion. Preview any world, then personalise it with your names.
            </Reveal>
          </div>
          <TemplateGrid templates={TEMPLATES} />
        </div>
      </section>

      <section id="films" className="sec films sec--center sec--tint">
        <span className="sec__glow sec__glow--navy" aria-hidden="true" />
        <div className="wrap">
          <div className="sec__head">
            <Reveal className="sec__eyebrow" as="p">Cinematic films</Reveal>
            <LineReveal
              as="h2"
              className="sec__title"
              lines={['Wedding films that play', <em key="e">like a trailer.</em>]}
            />
            <Reveal className="sec__lead" as="p" delay={0.1}>
              Prefer a film? Each design also comes as a cinematic video invitation, with your names, date and venue woven into a shareable trailer for your day.
            </Reveal>
          </div>
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
