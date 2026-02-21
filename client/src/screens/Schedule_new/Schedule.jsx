import React, { useState } from 'react';
import './Schedule.css';
import Heading from '../../components/Headingv2/Headingv2'; 
import Button from '../../components/Button/Button'; 
import maskGroup from '../../assets/images/home/Mask_group.webp';


const Schedule = () => {
  const [activeTab, setActiveTab] = useState(0);

  const scheduleData = [
    { 
      day: "01", 
      title: "CLASSICAL NIGHT", 
      desc: "From the pulsating beats of the music to the kaleidoscope of colors lighting up the night sky. Here's to reliving those cherished moments and having a blast along the way!",
      image: maskGroup //image1 
    },
    { 
      day: "02", 
      title: "BEINGS NIGHT", 
      desc: "Experience the raw energy of live rock as the best bands take the stage to electrify your soul and keep the energy soaring.",
      image: maskGroup //image2 
    },
    { 
      day: "03", 
      title: "KOLKATA NIGHT", 
      desc: "Dance through the night as our guest DJs spin the most electric tracks under the neon glow of the Lords' Ground.",
      image: maskGroup // image3 
    },
    { 
      day: "04", 
      title: "MUMBAI NIGHT", 
      desc: "A grand finale celebrating the spirit of Rebecca with prestigious performances, awards, and memories for a lifetime.",
      image: maskGroup //image4 
    },
  ];

  return (
    <div className="schedule-container">

      {/* Tabs Layout */}
      <div className="tabs-container">
        {scheduleData.map((item, index) => (
          <div 
            key={index} 
            className={`tab-item ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <div className="day-label">DAY {item.day}</div>
            <div className="event-label">{item.title}</div>
          </div>
        ))}
      </div>

      {/* Content Area with Dynamic Background Image */}
      <div className="content-viewport">
        <div className="vignette-wrapper">
          <img 
            src={scheduleData[activeTab].image} 
            alt={`Schedule Day ${scheduleData[activeTab].day}`} 
            className="background-mask-img" 
            loading="lazy"
          />
          <div className="text-overlay">
            <p>{scheduleData[activeTab].desc}</p>
            <div className="button-wrapper">
              <Button 
                innerText="KNOW MORE" 
                variant="primary" 
                color="magenta" 
                size="medium"
                href="#"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
