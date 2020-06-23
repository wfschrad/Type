import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

export class Confirm extends Component {
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
        return (
            <MuiThemeProvider>
                <>
                <AppBar title="Confirm Details"/>
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
                <RaisedButton
                label="Continue"
                primary={true}
                style={styles.button}
                onClick={this.continue}
                />
                <RaisedButton
                label="Back"
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

export default Confirm;
