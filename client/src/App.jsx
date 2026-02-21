import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import AllRoutes from "./Routes.jsx";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import Footer2 from "./components/Footer2/Footer2.jsx";


import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./AuthContext.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";
import DrawingLoader from "./components/Preloader/DrawingLoader.jsx";
import ScrollSmoother from "./components/ScrollSmoother/ScrollSMoother.jsx";

const client_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const nights = { saptami: 19, ashtami: 20, navami: 21, dashami: 22 };

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#5075f6", // Light blue
        },
        secondary: {
            main: "#705dea", // Pink
        },
        background: {
            default: "#1a1a1a", // Dark background
            paper: "#1d1d1d", // Slightly lighter for cards, etc.
        },
        text: {
            primary: "#ffffff", // White text
            secondary: "#bdbdbd", // Grey text
        },
    },
});

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <ScrollSmoother>
            <GoogleOAuthProvider clientId={client_ID}>
                {isLoading && <DrawingLoader onComplete={() => setIsLoading(false)} />}
                <div
                    className="App"
                    style={{ visibility: isLoading ? "hidden" : "visible", transition: "visibility 0.3s ease" }}
                >
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <SpeedInsights />
                        <Analytics />
                        <AuthProvider>
                            <Router>
                                <Navbar></Navbar>
                                <AllRoutes></AllRoutes>
                                {/* <Footer></Footer> */}
                                <Footer2></Footer2>
                            </Router>
                        </AuthProvider>
                    </ThemeProvider>
                </div>
            </GoogleOAuthProvider>
        </ScrollSmoother>
    );
}

export default App;
