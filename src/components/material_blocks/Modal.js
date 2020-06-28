import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


import Modal from '@material-ui/core/Modal';
import TextField from 'material-ui/TextField';

import TypingForm from '../PTypeForm/TypingForm';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'auto',
        maxHeight: '100%'
    },
    modalButton: {
        borderRadius: '15%',
        backgroundColor: 'yellow',
        '&:hover': {
            backgroundColor: 'blue'
        }
    },
    formButton: {
        '&:hover': {
            backgroundColor: 'rgb(0, 188, 212)',
        }
    }
}));

export default function SimpleModal({ user }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user.preferredName);

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Update Profile Info</h2>
            <MuiThemeProvider>
                <form>
            <TextField
                hintText="Enter Your First Name"
                floatingLabelText="First Name"
                onChange={handleChange('prefName')}
                defaultValue={user.preferredName}
                />
                <br/>
                <TextField
                hintText="Enter Your Age"
                floatingLabelText="Age"
                onChange={handleChange('age')}
                defaultValue={user.age}
                />
                <br/>
                <TextField
                hintText="Enter Your Gender"
                floatingLabelText="Gender"
                onChange={handleChange('gender')}
                defaultValue={user.gender}
                />
                <br/>
                <TextField
                hintText="Enter Your Bio"
                floatingLabelText="Bio"
                onChange={handleChange('bio')}
                defaultValue={user.bio}
                />
                <RaisedButton
                className={classes.formButton}
                onClick={handleSubmit}
                >
                    Update
                </RaisedButton>
                                </form>

                </MuiThemeProvider>
        </div>
    );

    return (
        <div>
            <button className={classes.modalButton} type="button" onClick={handleOpen}>
                Edit Biographical Information
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
