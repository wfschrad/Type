import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withAlert } from 'react-alert'


const useStyles = (theme) => ({
    gridContainer: {
        marginTop: 30
    },
    formHeading: {
        backgroundColor: 'rgb(0, 188, 212)',
        height: 30,
        color: 'white',
        fontSize: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    formContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

class BasicInfoForm extends Component {
    continue = ev => {
        ev.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { classes } = this.props;
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item sm={3}></Grid>
                <Grid className={classes.formContent} item sm={6}>
                <>
                {/* <AppBar title="Enter Personal Information"/> */}
                <div className={classes.formHeading}>Enter Personal Information</div>
                <TextField
                hintText="Enter Your First Name"
                floatingLabelText="First Name"
                onChange={handleChange('prefName')}
                defaultValue={values.firstName}
                />
                <br/>
                <TextField
                hintText="Enter Your Age"
                floatingLabelText="Age"
                onChange={handleChange('age')}
                defaultValue={values.age}
                />
                <br/>
                <TextField
                hintText="Enter Your Gender"
                floatingLabelText="Gender"
                onChange={handleChange('gender')}
                defaultValue={values.gender}
                />
                <br/>
                <TextField
                hintText="Enter Your Bio"
                floatingLabelText="Bio"
                onChange={handleChange('bio')}
                defaultValue={values.bio}
                />
                <br/>
                <RaisedButton
                label="Continue"
                primary={true}
                style={styles.button}
                onClick={this.continue}
                />
                </>
                </Grid>
                <Grid item sm={3}></Grid>

                </Grid>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15,
        maxWidth: "100px"
    }
}

export default withStyles(useStyles)(withAlert()(BasicInfoForm));
