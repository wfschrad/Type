import React from 'react';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useAuth0 } from "../../react-auth0-spa";
import MenuButton from "./NavMenu";
import MenuList from '@material-ui/core/MenuList';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        MarginBottom: "10px"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        backgroundColor: 'rgb(0, 188, 212)',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
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


export default function PrimarySearchAppBar() {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorelleft, setanchorelleft] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isLeftOpen = Boolean(anchorelleft);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const history = useHistory();

    const handleLeftOpen = (ev) => {
        setanchorelleft(ev.currentTarget);
        console.log('help')
    }

    const handleLeftClose = (ev) => {
        setanchorelleft(null);
    }
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLeftClick = (ev) => {
        console.log('left click')
    }

    const handleAccountClick = (ev) => {
        console.log('account click')
    }

    const handleProfileClick = (ev) => {
        handleMenuClose(ev);
        history.push(`/profile/${user.id}`);
    }

    const handleLogout = (ev) => {
        localStorage.removeItem("custom_crafts_userObj");
        localStorage.removeItem("custom_crafts_userTWJ");
        logout();
    }

    const handleLogin = (ev) => {
        history.push('/account');
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >{user ?(
                    <MenuList>
                        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
            ) :     <MenuItem onClick={handleLogin}>Login</MenuItem>
            }
                </Menu>
        </>

    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    {/* <Badge badgeContent={4} color="secondary"> */}
                        <MailIcon />
                    {/* </Badge> */}
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    {/* <Badge badgeContent={11} color="secondary"> */}
                        <NotificationsIcon />
                    {/* </Badge> */}
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar style={{backgroundColor:'rgba(4, 0, 255, 0.438)'}} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        {/* <MenuIcon>
                            onClick={handleLeftClick}
                        </MenuIcon> */}
                        <MenuButton />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                    // onClose={handleClose}
                    >
                        {/* <MenuItem onClick={handleClose}>Match</MenuItem>
                            <MenuItem onClick={handleClose}>Messages</MenuItem>
                            <MenuItem onClick={handleClose}>My Account</MenuItem> */}
                    </Menu>
                    {/* </IconButton> */}

                    <Typography className={classes.title} variant="h6" noWrap>
                        Type
          </Typography>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div> */}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            {/* <Badge badgeContent={4} color="secondary"> */}
                                <MailIcon />
                            {/* </Badge> */}
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            {/* <Badge badgeContent={17} color="secondary"> */}
                                <NotificationsIcon />
                            {/* </Badge> */}
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
