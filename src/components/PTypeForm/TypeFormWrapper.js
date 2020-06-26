import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TypingForm from './TypingForm';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
        padding: 20,
        width: '100%'
    },
    formContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

class TypeFormWrapper extends Component {
    continue = ev => {
        ev.preventDefault();
        this.props.nextStep();
    }

    back = ev => {
        ev.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values, handleChange, classes } = this.props;
        return (
            <MuiThemeProvider>
                <>
                    <div className={classes.formHeading}>Get Your Personality Type Profile!</div>
                    <p>When answering the following questions, do your best to be as accurate as possible
                    Choose the answer that best represents your personality most of the time.
                </p>
                    <TypingForm
                        continueFunc={this.continue}
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

export default withStyles(useStyles)(TypeFormWrapper);
