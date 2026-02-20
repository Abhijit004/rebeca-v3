import React, { useState } from 'react';
import './SponsorSkillTree.css';

const tiers = [
  { id: 1, name: "BECA SPONSOR", amount: "2.5 LAKH", icon: "change_history", x: "15%", y: "50%" },
  { id: 2, name: "ASSOCIATE SPONSOR", amount: "5.0 LAKH", icon: "widgets", x: "38%", y: "50%" },
  { id: 3, name: "CO-SPONSOR", amount: "8.0 LAKH", icon: "all_inclusive", x: "62%", y: "50%" },
  { id: 4, name: "TITLE SPONSOR", amount: "10 LAKH", icon: "diamond", x: "85%", y: "50%" }
];

const branches = [
  { id: 1, x1: "15%", y1: "50%", x2: "38%", y2: "50%", reqLevel: 2 },
  { id: 2, x1: "38%", y1: "50%", x2: "62%", y2: "50%", reqLevel: 3 },
  { id: 3, x1: "62%", y1: "50%", x2: "85%", y2: "50%", reqLevel: 4 },
];

const perksData = {
  1: ["Logo on standard event banners", "Shared social media mentions", "Basic 3x3 stall space allocated", "Standard certificate"],
  2: ["Logo on main stage side-panels", "Dedicated individual social media post", "Premium stall space", "Passes for 5 reps"],
  3: ["Prominent campus logo placement", "Video ad playback between artist sets", "Prime stall location", "VIP seating for 10 guests"],
  4: ["Co-branded title: 'REBECA Presented By [Brand]'", "Maximum global visibility", "On-stage felicitation", "Exclusive prime lounge access"]
};

const SponsorSkillTree = () => {
  const [activeLevel, setActiveLevel] = useState(4); 
  const activeTierDetails = tiers.find(t => t.id === activeLevel);

  return (
    <div className="horizontal-tree-wrapper">
      
      {/* TOP SIDE: The Horizontal Timeline Canvas */}
      <div className="tree-canvas-horizontal">
        <svg className="tree-svg-layer">
          {branches.map((branch) => (
            <line
              key={`branch-${branch.id}`}
              x1={branch.x1} y1={branch.y1}
              x2={branch.x2} y2={branch.y2}
              pathLength="1"
              className={`tree-branch ${activeLevel >= branch.reqLevel ? 'branch-unlocked' : ''}`}
            />
          ))}
        </svg>

        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`tree-node-horizontal ${activeLevel >= tier.id ? 'node-unlocked' : ''} ${activeLevel === tier.id ? 'node-current' : ''}`}
            style={{ top: tier.y, left: tier.x }}
            onClick={() => setActiveLevel(tier.id)}
          >
            <div className="node-amount">{tier.amount}</div>
            <div className="node-icon-wrapper">
               <span className="material-icons">{tier.icon}</span>
            </div>
            <div className="node-name">{tier.name}</div>
          </div>
        ))}
      </div>

      {/* BOTTOM SIDE: The Data Codex */}
      <div className="tree-codex-horizontal">
        <div className="codex-left">
          <div className="codex-level-badge">Level 0{activeLevel} Unlocked</div>
          <h2 className="display-font codex-title">{activeTierDetails.name}</h2>
          <button className="initiate-btn">SELECT TIER</button>
        </div>
        
        <div className="codex-right">
          <h3 className="perks-heading">Tier Specific Upgrades:</h3>
          <ul className="perks-list">
            {perksData[activeLevel].map((perk, idx) => (
              <li key={idx} className="perk-item">
                <span className="material-icons perk-bullet">check_circle</span>
                {perk}
              </li>
            ))}
          </ul>
          
          {activeLevel > 1 && (
            <div className="inherited-perks-badge">
              <span className="material-icons">add_box</span>
              Includes all benefits from lower tiers
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsorSkillTree;