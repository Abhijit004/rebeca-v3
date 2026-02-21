import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Export this so ScrollToTop can find it
export let lenisInstance = null;

const ScrollSmoother = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisInstance = lenis; // Store the instance globally

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFunction = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFunction);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFunction);
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};

export default ScrollSmoother;