import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';



export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMatchClick = () => {
        setAnchorEl(null);
        console.log('match click')
    };

    const handleMingleClick = () => {
        setAnchorEl(null);
        console.log('mingle click')
        history.push('/mingle')
    };

    const handleAccountClick = () => {
        setAnchorEl(null);
        console.log('account click')
    };

    return (
        <div>
            <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
      </MenuIcon>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleMatchClick}>Find Match</MenuItem>
                <MenuItem onClick={handleMingleClick}>Mingle</MenuItem>
                <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
            </Menu>
        </div>
    );
}
