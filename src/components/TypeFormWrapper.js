import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TypingForm from './TypingForm';

export class TypeFormWrapper extends Component {
    continue = ev => {
        ev.preventDefault();
        this.props.nextStep();
    }

    back = ev => {
        ev.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <>
                    <AppBar title="Get Your Personality Type Profile!" />
                    <p>When answering the following questions, do your best to be as accurate as possible
                    Choose the answer that best represents your personality most of the time.
                </p>
                    <TypingForm
                        values={values}
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

export default TypeFormWrapper;
