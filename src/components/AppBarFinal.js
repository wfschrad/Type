import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, fade } from "@material-ui/core/styles";

import LeftMenu from "./NavMenu";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "10px",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    // title: {
    //     flexGrow: 1,
    // },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


const NavBar = () => {
    const classes = useStyles();
    const { isAuthenticated, loginWithPopup } = useAuth0();

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appBar}
                // style={{ backgroundColor: "#000a12" }}
                position="fixed"
            >
                <Toolbar disableGutters={true} style={{ paddingRight: '10px' }}>
                    <LeftMenu />
                    <Typography variant="h6" className={classes.title}>
                        <div>
                            <Link to="/" id="navbar-logo">
                                <Button
                                // style={{ color: "#00897b", fontSize: 20 }}>
                                >
                                    What's Your TYPE?
                  </Button>
                            </Link>
                        </div>
                    </Typography>
                    {!isAuthenticated && (
                        <Button
                            // style={{ color: "#e8eaf6" }}
                            onClick={() => loginWithPopup({})}
                        >
                            Log in
                        </Button>
                    )}

                    {isAuthenticated && (
                        <span>
                            {/* <Link to="/">
                <Button style={{ color: "#e8eaf6" }}>Home</Button>
              </Link>
              &nbsp; */}
                            <Link to="/profile">
                                <Button
                                // style={{ color: "#e8eaf6", padding: '5px', minWidth: 0 }}>
                                >
                                    <AccountCircleIcon />
                                </Button>
                            </Link>
                        </span>
                    )}
                    {/* {isAuthenticated && (
            <Button style={{ color: "#e8eaf6" }} onClick={() => logout()}>
              Log out
            </Button>
          )} */}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
};

export default NavBar;