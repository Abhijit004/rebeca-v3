import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrambleText = ({ targetText, speed = 1, delay = 0 }) => {
  const textRef = useRef(null);
  const chars = "COMING SOON"; // The "glitch" characters

  useEffect(() => {
    const element = textRef.current;

    // The animation logic
    const scramble = () => {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 80%", // Starts when the text is 80% from the top of the viewport
            toggleActions: "play none none none", // Plays only once
          }
        });

        // We animate a dummy object to track progress
        const obj = { value: 0 };
        
        tl.to(obj, {
          value: targetText.length,
          duration: speed,
          delay: delay,
          ease: "power1.inOut",
          onUpdate: () => {
            const progress = Math.floor(obj.value);
            const result = targetText.split('').map((char, index) => {
              if (index < progress) {
                return char; // Show real letter
              }
              // Show random character from our string
              return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            element.innerText = result;
          },
          onComplete: () => {
            element.innerText = targetText; // Ensure final string is perfect
          }
        });
      });

      return () => ctx.revert(); // Cleanup on unmount
    };

    scramble();
  }, [targetText, speed, delay]);

  return (
    <h1 
      ref={textRef} 
      style={{ fontFamily: 'monospace', fontWeight: 'bold' }}
    >
      {/* Initially empty or a placeholder of the same length to prevent layout shift */}
      {targetText.split('').map(() => '0').join('')}
    </h1>
  );
};

export default ScrambleText;