import { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState(0);

  const scheduleData = [
    { 
      day: "01", 
      title: "Classical Night", 
      desc: "From the pulsating beats of the music to the kaleidoscope of colors lighting up the night sky. Here's to reliving those cherished moments and having a blast along the way!",
      image: "/assets/imgs/home/saptami-bg.webp" //image1 
    },
    { 
      day: "02", 
      title: "BEings Night", 
      desc: "Experience the raw energy of live rock as the best bands take the stage to electrify your soul and keep the energy soaring.",
      image: "/assets/imgs/home/ashtami-bg.webp" //image2 
    },
    { 
      day: "03", 
      title: "Kolkata Night", 
      desc: "Dance through the night as our guest DJs spin the most electric tracks under the neon glow of the Lords' Ground.",
      image: "/assets/imgs/home/navami-bg.webp" // image3 
    },
    { 
      day: "04", 
      title: "Mumbai Night", 
      desc: "A grand finale celebrating the spirit of Rebecca with prestigious performances, awards, and memories for a lifetime.",
      image: "/assets/imgs/home/dashami-bg.webp" //image4 
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
            {/* <div className="button-wrapper">
              <Button 
                innerText="KNOW MORE" 
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
