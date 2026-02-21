import { useState, useEffect } from "react";
import { Drawer, Avatar, Menu, MenuItem, IconButton, Typography, Button, Box } from "@mui/material";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../AuthContext";
import AccountMenu from "../AccountMenu/AccountMenu";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { innerWidth: width, innerHeight: height } = window;

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleLinkClick = () => {
        handleDrawerClose();
    };

    return (
        <>
            <div className="navbar">
                {/* <Progressbar /> */}

                {/* {user && <Notification message={`Welcome, ${user.name.split(' ')[0]}`} />} */}
                {/* <LoginForm open={loginOpen} setOpen={setLoginOpen} /> */}
                <div className="left-col">
                    {width < 720 && (
                        <IconButton
                            id="drawer-open-btn"
                            onClick={handleDrawerOpen}
                            variant="filled"
                            color="primary"
                            
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Link to="/">
                        <img
                            src="/assets/logo/logo_white.webp"
                            alt="rebeca_logo"
                            style={{ padding: "1rem 0px", width: "100px", marginLeft: "10px" }}
                        />
                    </Link>
                </div>

                <div className="nav-items">
                    {width >= 720 && (
                        <>
                            <NavLink id="nav-home" className={"item"} to="/">
                                Home
                            </NavLink>
                            <NavLink id="nav-events" className={"item"} to="/events">
                                Events
                            </NavLink>

                            <NavLink to="/sponsorship" id="nav-sponsorship" className={"item"}>
                                Sponsorship
                            </NavLink>
                            <NavLink id="nav-team" to="/team" className={"item"}>
                                Our Team
                            </NavLink>
                            <NavLink id="nav-merchandise" to="/merchandise" className={"item"}>
                                Merchandise
                            </NavLink>
                            {/* <AccountMenu /> */}
                        </>
                    )}
                    {/* {width < 720 && (
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <AccountMenu />
                        </Box>
                    )} */}
                </div>
            </div>

            <ResponsiveDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};

export default Navbar;
