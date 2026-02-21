import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SponsorSkillTree.css';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { id: 1, name: "BECA SPONSOR", amount: "2.5 LAKH", icon: "change_history", x: "15%", y: "50%" },
  { id: 2, name: "ASSOCIATE SPONSOR", amount: "5.0 LAKH", icon: "widgets", x: "38%", y: "50%" },
  { id: 3, name: "CO-SPONSOR", amount: "8.0 LAKH", icon: "all_inclusive", x: "62%", y: "50%" },
  { id: 4, name: "TITLE SPONSOR", amount: "10 LAKH", icon: "diamond", x: "85%", y: "50%" }
];

const perksData = {
  1: ["Logo on standard event banners", "Shared social media mentions", "Basic 3x3 stall space allocated", "Standard certificate"],
  2: ["Logo on main stage side-panels", "Dedicated individual social media post", "Premium stall space", "Passes for 5 reps"],
  3: ["Prominent campus logo placement", "Video ad playback between artist sets", "Prime stall location", "VIP seating for 10 guests"],
  4: ["Co-branded title: 'REBECA Presented By [Brand]'", "Maximum global visibility", "On-stage felicitation", "Exclusive prime lounge access"]
};

const SponsorSkillTree = () => {
  const [activeLevel, setActiveLevel] = useState(1); 
  const [displayLevel, setDisplayLevel] = useState(1); 
  
  const triggerRef = useRef(null); 
  const codexRef = useRef(null);
  const currentLevelRef = useRef(1);
  const scrollTriggerRef = useRef(null);

  const activeTierDetails = tiers.find(t => t.id === displayLevel);

  useGSAP(() => {
    // FIX 1: Instantly reset the scroll to the top when navigating from another page
    // This prevents React Router from inheriting the scroll position of the Home page
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true, 
        start: "center center",
        end: "+=1500", 
        scrub: 1, 
        anticipatePin: 1, 
        onUpdate: (self) => {
          const p = self.progress;
          let newLevel = 1;
          if (p >= 0.30) newLevel = 2;
          if (p >= 0.63) newLevel = 3;
          if (p >= 0.95) newLevel = 4;

          if (newLevel !== currentLevelRef.current) {
            currentLevelRef.current = newLevel;
            setActiveLevel(newLevel); 

            gsap.killTweensOf(codexRef.current);
            
            gsap.to(codexRef.current, {
              opacity: 0, x: -20, duration: 0.15, ease: "power2.in",
              onComplete: () => {
                setDisplayLevel(newLevel);
                gsap.fromTo(codexRef.current,
                  { opacity: 0, x: 20 },
                  { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }
                );
              }
            });
          }
        }
      }
    });

    scrollTriggerRef.current = tl.scrollTrigger; 

    tl.fromTo('.tree-progress', 
      { strokeDashoffset: 100 }, { strokeDashoffset: 0, ease: "none" }, 0);
    
    tl.fromTo('.desktop-spark', 
      { left: "15%", top: "50%" }, { left: "85%", top: "50%", ease: "none" }, 0);

    tl.fromTo('.mobile-spark', 
      { left: "50%", top: "15%" }, { left: "50%", top: "85%", ease: "none" }, 0);

    // FIX 2: The SPA Refresh Timer
    // Forces GSAP to recalculate its trigger positions right after the page renders 
    // and layout shifts (like images loading) have settled.
    const stRefresh = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // Cleanup function to clear the timeout if the component unmounts quickly
    return () => clearTimeout(stRefresh);

  }, { scope: triggerRef }); 

  const handleNodeClick = (levelId) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    let targetProgress = 0;
    if (levelId === 1) targetProgress = 0;
    if (levelId === 2) targetProgress = 0.33;
    if (levelId === 3) targetProgress = 0.66;
    if (levelId === 4) targetProgress = 1;
    window.scrollTo({ top: st.start + (st.end - st.start) * targetProgress, behavior: 'smooth' });
  };

  return (
    <div className="tree-trigger-wrapper" ref={triggerRef}>
      <div className="horizontal-tree-wrapper">
        <div className="tree-canvas-horizontal">
          
          {/* DESKTOP SVG & SPARK */}
          <div className="track-container desktop-track">
            <svg className="tree-svg-layer">
              <line x1="15%" y1="50%" x2="85%" y2="50%" className="tree-track" />
              <line className="tree-progress" x1="15%" y1="50%" x2="85%" y2="50%" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
            </svg>
            <div className="progress-spark desktop-spark"></div>
          </div>

          {/* MOBILE SVG & SPARK */}
          <div className="track-container mobile-track">
            <svg className="tree-svg-layer">
              <line x1="50%" y1="15%" x2="50%" y2="85%" className="tree-track" />
              <line className="tree-progress" x1="50%" y1="15%" x2="50%" y2="85%" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
            </svg>
            <div className="progress-spark mobile-spark"></div>
          </div>

          {/* HTML NODES */}
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`tree-node-horizontal ${activeLevel >= tier.id ? 'node-unlocked' : ''} ${activeLevel === tier.id ? 'node-current' : ''}`}
              style={{ '--dt-x': tier.x, '--dt-y': tier.y, '--mb-x': tier.y, '--mb-y': tier.x }}
              onClick={() => handleNodeClick(tier.id)}
            >
              <div className="node-amount">{tier.amount}</div>
              <div className="node-icon-wrapper">
                 <span className="material-icons">{tier.icon}</span>
              </div>
              <div className="node-name">{tier.name}</div>
            </div>
          ))}
        </div>

        {/* CODEX */}
        <div className="tree-codex-horizontal">
          <div className="codex-animated-wrapper" ref={codexRef}>
            <div className="codex-left">
              <div className="codex-level-badge">Level 0{displayLevel} Unlocked</div>
              <h2 className="display-font codex-title">{activeTierDetails.name}</h2>
              {/* <button className="initiate-btn">SELECT TIER</button> */}
            </div>
            
            <div className="codex-right">
              <h3 className="perks-heading">Tier Specific Upgrades:</h3>
              <ul className="perks-list">
                {perksData[displayLevel].map((perk, idx) => (
                  <li key={idx} className="perk-item">
                    <span className="material-icons perk-bullet">check_circle</span>
                    {perk}
                  </li>
                ))}
              </ul>
              {displayLevel > 1 && (
                <div className="inherited-perks-badge">
                  <span className="material-icons">add_box</span> Includes all benefits from lower tiers
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorSkillTree;