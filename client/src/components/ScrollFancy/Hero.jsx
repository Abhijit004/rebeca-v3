import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GsapScrubber = () => {
    const canvasRef = useRef(null);
    const sectionRef = useRef(null);
    const containerRef = useRef(null); // Ref for the inner wrapper
    const wordsRef = useRef([]);
    const words = ["Welcome", "To", "Rebeca", "", ""];

    const totalFrames = 120;
    const getFrameUrl = (index) => `/rebeca-pink-frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.webp`;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const airpods = { frame: 0 };
        const images = [];

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            img.src = getFrameUrl(i);
            images.push(img);
        }

        const render = () => {
            const img = images[airpods.frame];
            if (!img) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const imgRatio = img.width / img.height;
            const canvasRatio = canvas.width / canvas.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                drawHeight = canvas.height;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        images[0].onload = render;

        // --- ISOLATED TIMELINE ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current, // Start when this section hits the top
                start: "top top",
                end: "+=500%", // Scroll distance is 5x the viewport height
                scrub: 1,
                pin: true, // This "locks" the component in place while animating
                anticipatePin: 1,
            },
        });

        // 1. Image Sequence
        tl.to(
            airpods,
            {
                frame: totalFrames - 1,
                snap: "frame",
                ease: "none",
                onUpdate: render,
            },
            0,
        );

        // 2. Text Sequence (Using your exact 12-frame interval and 0.05 offsets)
        words.forEach((_, i) => {
            const targetFrame = (i + 1) * 12;
            const startTime = targetFrame / totalFrames;

            // FADE IN: Triggers exactly at (startTime - 0.05)
            tl.to(
                wordsRef.current[i],
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.05,
                    ease: "power2.out",
                },
                startTime - 0.05,
            );

            // FADE OUT: Only occurs if it's NOT the last word
            // Triggers exactly at (startTime + 0.05)
            if (i != 2) {
                tl.to(
                    wordsRef.current[i],
                    {
                        opacity: 0,
                        y: -40,
                        filter: "blur(20px)",
                        duration: 0.05,
                        ease: "power2.in",
                    },
                    startTime + 0.05,
                );
            } else {
                console.log(i);
            }
        });

        window.addEventListener("resize", render);

        return () => {
            window.removeEventListener("resize", render);
            // Clean up triggers for this specific instance
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        /* The "Trigger" section. No height needed, GSAP 'pin' handles it */
        <section ref={sectionRef} style={{ overflow: "hidden", backgroundColor: "#000" }}>
            <div
                ref={containerRef}
                style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                {words.map((word, index) => (
                    <h1
                        key={index}
                        ref={(el) => (wordsRef.current[index] = el)}
                        style={{
                            position: "absolute",
                            zIndex: 10,
                            color: "white",
                            fontSize: "clamp(3rem, 12vw, 8rem)",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            opacity: 0,
                            transform: "translateY(40px)",
                            filter: "blur(20px)",
                            pointerEvents: "none",
                            textAlign: "center",
                            fontFamily: "Sedgwick Ave Display, -apple-system, sans-serif",
                            textShadow: "0,0,10px #000"
                        }}
                    >
                        {word}
                    </h1>
                ))}

                <canvas ref={canvasRef} style={{ display: "block" }} />
            </div>
        </section>
    );
};

export default GsapScrubber;
