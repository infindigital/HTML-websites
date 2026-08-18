import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navigation from './components/Navigation.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import Lineup from './components/sections/Lineup.jsx';
import ProductFocus from './components/sections/ProductFocus.jsx';
import Explorer from './components/sections/Explorer.jsx';
import Ritual from './components/sections/Ritual.jsx';
import Ingredients from './components/sections/Ingredients.jsx';
import Story from './components/sections/Story.jsx';
import Promise from './components/sections/Promise.jsx';
import Shop from './components/sections/Shop.jsx';
import Final from './components/sections/Final.jsx';

import { stage, setPose } from './three/stage.js';
import { products } from './data/content.js';

gsap.registerPlugin(ScrollTrigger);

// Canvas is heavy — load it only when WebGL is available.
const Scene = lazy(() => import('./three/Scene.jsx'));

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export default function App() {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef(null);
  const webgl = useRef(hasWebGL());

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  stage.reduceMotion = reduceMotion;
  if (typeof window !== 'undefined') {
    stage.mobile = window.matchMedia('(max-width: 640px)').matches;
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    if (!webgl.current) setReady(true); // no canvas -> dismiss loader

    // Smooth scroll (skipped when reduced motion is requested).
    if (!reduceMotion) {
      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      var cleanupLenis = () => { gsap.ticker.remove(raf); lenis.destroy(); };
    }

    const ctx = gsap.context(() => {
      // Fade-up reveals
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        if (reduceMotion) { el.style.opacity = 1; el.style.transform = 'none'; return; }
        gsap.fromTo(el, { opacity: 0, y: 26 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%' },
        });
      });

      // Product pose per section
      gsap.utils.toArray('[data-pose]').forEach((el) => {
        const id = el.getAttribute('data-pose');
        ScrollTrigger.create({
          trigger: el, start: 'top 62%', end: 'bottom 38%',
          onEnter: () => setPose(id),
          onEnterBack: () => setPose(id),
        });
      });
    });

    const onResize = () => {
      stage.mobile = window.matchMedia('(max-width: 640px)').matches;
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refresh);
      window.removeEventListener('resize', onResize);
      ctx.revert();
      if (typeof cleanupLenis === 'function') cleanupLenis();
    };
  }, [reduceMotion]);

  const gobi = products.find((p) => p.key === 'gobi');
  const three = products.find((p) => p.key === 'threeInOne');

  return (
    <>
      {webgl.current && <LoadingScreen ready={ready} />}
      <CustomCursor />
      <Navigation onNavigate={scrollTo} />

      {webgl.current ? (
        <div className="stage-canvas">
          <Suspense fallback={null}>
            <Scene onReady={() => setReady(true)} />
          </Suspense>
        </div>
      ) : null}

      <main className="content">
        <Hero />
        <Lineup />
        <ProductFocus
          id="gobi" pose="gobi" side="left" index={gobi.index}
          title="Gobi Manchurian" sub="Crispy. Spicy. Restaurant-style."
          body={gobi.body} labels={gobi.dishes}
        />
        <ProductFocus
          id="threeInOne" pose="threeInOne" side="right" index={three.index}
          title="3 in 1" sub="One masala. Three favourites."
          body={three.body} labels={three.dishes}
        />
        <Explorer />
        <Ritual />
        <Ingredients />
        <Story />
        <Promise />
        <Shop />
        <Final />
      </main>
      <Footer />
    </>
  );
}
