import React, { createContext, useContext, useState, useEffect } from "react";
import useNotification from "./hooks/useNotification";
import {
    AdminPanelSettings,
    AttachMoney,
    Palette,
    Event,
    Info,
    DirectionsBus,
    Handshake,
    Article,
    Campaign,
    Brush,
    Groups,
    Code,
    Restaurant,
    VolunteerActivism,
    CameraAlt,
    AssignmentInd,
    AccountBalance,
    MenuBook,
} from "@mui/icons-material";
const AuthContext = createContext();
import { loginWithGoogle, logoutUser, checkAuthStatus, getAllEvents, getAllTeams } from "./services/api";
import { googleLogout } from "@react-oauth/google";

export const teamIcons = {
    "Secretary General": <AdminPanelSettings />,
    "Finance": <AttachMoney />,
    "Cultural": <Palette />,
    "Events": <Event />,
    "Resource Information": <Info />,
    "Travel and Logistics": <DirectionsBus />,
    "Sponsorship": <Handshake />,
    "Publication": <Article />,
    "Publicity": <Campaign />,
    "Stage Decoration": <Brush />,
    "Business and Alumni Meet": <Groups />,
    "Competition and Seminars": <Code />,
    "Web Development": <Code />,
    "Refreshments": <Restaurant />,
    "Stage and Campus Decorations": <VolunteerActivism />,
    "Volunteers": <VolunteerActivism />,
    "Photography": <CameraAlt />,
    "Joint Secretary": <AssignmentInd />,
    "Fixed Signatory": <AccountBalance />,
    "BECA Magazine": <MenuBook />,
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoad, setUserLoad] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [allEventsByDay, setAllEventsByDay] = useState({saptami: [], ashtami: [], navami: [], dashami: []});
    const [allTeams, setAllTeams] = useState([]);
    const [teamsData, setTeamsData] = useState({});
    const { Notification, showNotification } = useNotification();

    const handlesetEventsByDay = (e) => {
        const grouped = {
            saptami: [],   // March 19
            ashtami: [],   // March 20
            navami: [],    // March 21
            dashami: []    // March 22
        };
        
        e.forEach(event => {
            const date = new Date(event.startTime);
            const day = date.getDate();
            
            if (day === 19) {
                grouped.saptami.push(event);
            } else if (day === 20) {
                grouped.ashtami.push(event);
            } else if (day === 21) {
                grouped.navami.push(event);
            } else if (day === 22) {
                grouped.dashami.push(event);
            }
        });
        
        setAllEventsByDay(grouped);
    }

    useEffect(() => {
        // load events
        try {
            const e = getAllEvents();
            setAllEvents(e);
            handlesetEventsByDay(e)
            const t = getAllTeams();
            setAllTeams(t);
        } catch (err) {
            showNotification(`Err: ${err}`, 'error');
        }
    }, []);

    useEffect(() => {
        // check auth status
        const initAuth = async () => {
            setUserLoad(true);
            try {
                // This request automatically sends the 'jwt' cookie if it exists
                const res = await checkAuthStatus();
                console.log(res);

                if (res.data.status === "success") {
                    console.log("login success")
                    setUser(res.data.data.user);
                    showNotification(`Welcome, ${res.data.data.user.name}`, 'success')
                } else {
                    showNotification(`Error occured while logging in the user.`, 'error')
                }
            } catch (err) {
                setUser(null);
                showNotification(`${err.response.data.message}`, 'error')
            } finally {
                setUserLoad(false);
            }
        };
        
        // need to umcomment this for google login
        // initAuth();
        // console.log("What we set as user:")
        // console.log(user)
    }, []);

    const handleLoginSuccess = async (response) => {
        setUserLoad(true);
        try {
            const res = await loginWithGoogle(response.credential);
            setUser(res.data.data.user);
            showNotification("Login successful!", "success");
        } catch (err) {
            console.log("Login Failed on Backend:", err.response?.data || err.message);
            showNotification("Login failed. Please try again.", "error");
        } finally {
            setUserLoad(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            googleLogout();
            setUser(null);
            localStorage.removeItem("session");
            showNotification("Logged out successfully", "success");
        } catch (err) {
            console.error("Logout failed:", err);
            showNotification(`Logout failed: ${err.message}`, "error");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                handleLoginSuccess,
                handleLogout,
                allEvents,
                allTeams,
                setAllEvents,
                setAllTeams,
                userLoad,
                setUserLoad,
                showNotification,
                allEventsByDay
            }}
        >
            <Notification />
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
