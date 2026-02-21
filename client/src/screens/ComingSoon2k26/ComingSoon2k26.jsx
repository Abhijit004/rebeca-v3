import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ComingSoon2k26.css';

const ComingSoon2k26 = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        // Elegant and vibrant GSAP entrance animation
        if (contentRef.current) {
            const bannerElements = document.querySelectorAll('.animate-banner');

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(bannerElements,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
            );
        }
    }, []);

    return (
        <div className="coming-soon-2k26-container">
            <div className="top-banner" ref={contentRef}>
                <h1 className="page-title animate-banner">Coming Soon</h1>
            </div>
        </div>
    );
};

export default ComingSoon2k26;
