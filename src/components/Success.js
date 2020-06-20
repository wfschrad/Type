import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

export class Success extends Component {
    continue = ev => {
        ev.preventDefault();
        //Process form, post user
        this.props.nextStep();
    }

    back = ev => {
        ev.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <MuiThemeProvider>
                <>
                <AppBar title="Confirm Details"/>
                <h1>All Set!</h1>
                <p>Congratulations on taking the first step towards finding your ideal partner type.
                    Use the buttons below to edit your profile information, or get matching right away!
                </p>
                <RaisedButton
                label="See Matches!"
                primary={true}
                style={styles.button}
                onClick={this.back}
                />
                   <RaisedButton
                label="Check Profile"
                primary={true}
                style={styles.button}
                onClick={this.back}
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

export default Success;
