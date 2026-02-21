import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const DrawingLoader = ({ onComplete }) => {
  const pathRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const totalFrames = 120;

  useEffect(() => {
    // 1. Setup the Infinite Loop Animation
    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set the dash to be about 30% of the total length
    gsap.set(path, {
      strokeDasharray: `${length * 0.3} ${length * 0.7}`,
      strokeDashoffset: length
    });

    // Infinite "Chaser" loop
    const loop = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      repeat: -1,
      ease: "none"
    });

    // 2. Preloading Logic
    let loadedCount = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/assets/video-frames/frame-${i.toString().padStart(3, '0')}.webp`;
      
      const handleLoad = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad; // Safety check
    }

    // 3. Exit Animation
    if (isLoaded) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(path, { 
        strokeDasharray: `${length} 0`, // Close the path fully
        duration: 0.5 
      })
      .to(containerRef.current, {
        opacity: 0,
        blur: 10,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }

    return () => loop.kill(); // Cleanup on unmount
  }, [isLoaded, onComplete]);

  return (
    <div ref={containerRef} style={styles.wrapper}>
      <svg viewBox="0 0 100 100" style={styles.svg}>
        {/* The loopable path */}
        <path
          ref={pathRef}
          d="M50 20 L80 80 L20 80 Z" // A simple triangle, replace with your logo path
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <p style={styles.loadingText}>Setting up the stage for something special...</p>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'fixed', inset: 0, zIndex: 1000,
    display: 'flex',
    background: '#000',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
  },
  svg: { width: '10vw', height: '10vw', marginBottom: '20px', zIndex: 100000 },
  loadingText: {
    color: 'white', letterSpacing: '4px',
    opacity: 1, fontWeight: '300',
    width: '100%',
    fontSize: '1rem',
    textAlign: 'center',
    width: '80%',
    zIndex: 100000
  }
};

export default DrawingLoader;