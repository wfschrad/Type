import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
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

class Confirm extends Component {



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
        const { values: { prefName, gender, age, bio }} = this.props;
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <>
                <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item sm={3}></Grid>
                <Grid className={classes.formContent} item sm={6}>
                <div className={classes.formHeading}>Confirm Details</div>
                <List>
                    <ListItem
                    primaryText="Preferred Name"
                    secondaryText={prefName}
                    />
                    <ListItem
                    primaryText="Age"
                    secondaryText={age}
                    />
                    <ListItem
                    primaryText="Gender"
                    secondaryText={gender}
                    />
                    <ListItem
                    primaryText="Bio"
                    secondaryText={bio}
                    />
                </List>
                <span>
                <RaisedButton
                label="Back"
                primary={true}
                style={styles.button}
                onClick={this.back}
                />
                <RaisedButton
                label="Continue"
                primary={true}
                style={styles.button}
                onClick={this.continue}
                />
                </span>
                </Grid>
                <Grid item sm={3}></Grid>
                </Grid>

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

export default withStyles(useStyles)(Confirm);
