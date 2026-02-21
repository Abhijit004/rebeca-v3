import React from 'react';
import './SponsorsMarquee.css';

// Pass 'sponsorsList' in as a prop here
const SponsorsMarquee = ({ sponsorsList }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        
        {/* First set of logos */}
        <div className="logo-group">
          {sponsorsList.map((sponsor, index) => (
            <img 
              key={`set1-${index}`} 
              src={`/assets/${sponsor.imgname}.webp`} /* Adjust this path based on how your JSON formats the image name */
              alt="Past Sponsor" 
              className="sponsor-logo" 
            />
          ))}
        </div>

        {/* Second identical set for the seamless loop */}
        <div className="logo-group" aria-hidden="true">
          {sponsorsList.map((sponsor, index) => (
            <img 
              key={`set2-${index}`} 
              src={`/assets/imgs/sponsorship/${sponsor.imgname}.webp`} /* Adjust this path based on how your JSON formats the image name */
              alt="Past Sponsor" 
              className="sponsor-logo" 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default SponsorsMarquee;