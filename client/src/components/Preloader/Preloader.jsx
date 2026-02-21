import { useState, useEffect } from "react";

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let loadedCount = 0;
        const imagesToLoad = 120;

        const handleImageLoad = () => {
            loadedCount++;
            const percent = Math.floor((loadedCount / imagesToLoad) * 100);
            setProgress(percent);

            if (loadedCount >= imagesToLoad) {
                // Small buffer to ensure the UI shows 100% before disappearing
                setTimeout(() => {
                    onComplete();
                }, 300);
            }
        };

        for (let i = 1; i <= imagesToLoad; i++) {
            const img = new Image();
            // Path to your WebP frames in public/
            const src = `/assets/video-frames/frame-${i.toString().padStart(3, "0")}.webp`;

            img.onload = handleImageLoad;
            img.onerror = handleImageLoad; // Don't let a 404 break your site
            img.src = src;

            // Handle instantly cached images
            if (img.complete) {
                // If the browser already has it, it might not fire onload again
                // but we handle it via the listeners above usually.
                // Some older browsers need an explicit check here.
            }
        }
    }, [onComplete]);

    return (
        <div className="preloader-container" style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.text}>{progress}%</h1>
                <div style={styles.progressBarContainer}>
                    <div style={{ ...styles.progressBar, width: `${progress}%` }} />
                </div>
                <p style={styles.subtext}>Optimizing high-fidelity experience...</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        fontFamily: "var(--body-font)"
    },
    content: { textAlign: "center", width: "300px" },
    text: { fontSize: "3rem", margin: 0, fontWeight: "bold" },
    progressBarContainer: { width: "100%", height: "2px", background: "#333", marginTop: "20px" },
    progressBar: { height: "100%", background: "#fff", transition: "width 0.2s ease-out" },
    subtext: { marginTop: "15px", fontSize: "0.8rem", opacity: 0.6, letterSpacing: "1px" },
};

export default Preloader;
