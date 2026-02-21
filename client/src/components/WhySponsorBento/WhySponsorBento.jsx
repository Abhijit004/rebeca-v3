import React from 'react';
import './WhySponsorBento.css';

const reasons = [
  { id: 1, title: 'Market Development', icon: 'trending_up', desc: 'Expand your reach and tap into a diverse demographic of thousands of students across India.' },
  { id: 2, title: 'Industry Stalwarts', icon: 'handshake', desc: 'Connect directly with distinguished alumni, tech leaders, and influential personalities.' },
  { id: 3, title: 'Product Visibility', icon: 'visibility', desc: 'Showcase your offerings front and center to a highly engaged and captive audience.' },
  { id: 4, title: 'Publicity', icon: 'campaign', desc: 'Gain massive traction through our extensive campus, social media, and offline campaigns.' },
];

const WhySponsorBento = () => {
  return (
    <div className="bento-container">
      <h2 className="display-font bento-heading">Why Sponsor REBECA?</h2>
      <div className="bento-grid">
        {reasons.map((item) => (
          <div key={item.id} className="bento-card">
            <span className="material-icons bento-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhySponsorBento;