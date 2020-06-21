import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class BasicInfoForm extends Component {
    continue = ev => {
        ev.preventDefault();
        this.props.nextStep();
    }

    back = ev => {
        this.props.prevStep();
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <>
                <AppBar title="Enter Personal Information"/>
                <TextField
                hintText="Enter Your First Name"
                floatingLabelText="First Name"
                onChange={handleChange('firstName')}
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
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default BasicInfoForm
