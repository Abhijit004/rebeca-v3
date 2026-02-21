"use client";

import React, { useRef, useEffect, useState } from "react";

const ArtistList = ({ artists = [] }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight; 
      
      let progress = -rect.top / maxScroll;
      progress = Math.max(0, Math.min(progress, 1)); 
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!artists || artists.length === 0) return null;

  return (
    /* OUTER WRAPPER: Height halved to 200vh. Background made transparent. */
    <div 
      ref={containerRef} 
      style={{
        position: "relative",
        height: "50vh", 
        width: "100vw",
        backgroundColor: "transparent",
        marginLeft: "calc(-50vw + 50%)",
        zIndex: 10
      }}
    >
      {/* STICKY WINDOW: Height halved to 50vh. Pushed down slightly (top: 20vh) so it centers vertically on your screen. */}
      <div 
        style={{
          position: "sticky",
          top: "0vh", 
          height: "50vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        {/* HORIZONTAL TRACK */}
        <div
          style={{
            display: "flex",
            flexDirection: "row", 
            flexWrap: "nowrap",   
            alignItems: "center",
            width: "max-content", 
            gap: "5vw", // Slightly reduced gap to match the smaller height
            padding: "0 10vw",
            willChange: "transform",
            /* THE FIX: Changed scrollProgress to (1 - scrollProgress) to reverse the direction */
            transform: `translateX(calc(-${1 - scrollProgress} * (100% - 100vw)))`,
          }}
        >
          {artists.map((artist, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                flexShrink: 0, 
                width: "clamp(200px, 25vw, 350px)", // Adjusted width to look natural with the shorter height
                height: "35vh", // Height halved
                overflow: "visible", // Allowed visible overflow in case images have transparent edges
                backgroundColor: "transparent", // Transparent background
                transform: index % 2 !== 0 ? "translateY(5vh)" : "none", // Smaller stagger effect
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <img
                src={`/assets/imgs/artists/${artist.img}`}
                alt={artist.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // CRITICAL: Prevents cropping and shows original aspect ratio
                  pointerEvents: "none"
                }}
              />
              
              {/* Artist Name */}
              <h3 
                style={{
                  position: "absolute",
                  bottom: "0px",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                  margin: 0,
                  zIndex: 10,
                  // Added a text shadow to ensure it remains readable since we removed the dark gradient
                  textShadow: "0px 4px 10px rgba(0,0,0,0.9), 0px 1px 3px rgba(0,0,0,1)" 
                }}
              >
                {artist.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistList;