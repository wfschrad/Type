import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import { apiBaseUrl } from "../../config";



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
    },
    content: {
        width: '100%',
        fontSize: 20
    }
})

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('type_app_userObj'))
        }
    }

    continue = ev => {
        ev.preventDefault();
        //Process form, post user
       return <Redirect to='/profile'/>;

    }

    checkMatches = ev => {
        ev.preventDefault();
        return <Redirect to='/match'/>;
    }

    componentDidMount() {
        //fetch pType data
        const RESULTS_QUERY = `
        {
            user(email: "${this.state.user.email}"){
                PType {
                    name
                    description
                }
            }
        }
        `
        console.log('results query', RESULTS_QUERY);

        (async () => {
            const res = await Axios({
            url: apiBaseUrl,
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
            method: "post",
            data: {
                query: RESULTS_QUERY,
            },
        });
        console.log('res data: ', res.data.data);
        const user = res.data.data.user;
        this.setState({ user });
    })();
    }

    render() {
        const { classes } = this.props;
        const { user } = this.state;
        return (
            <MuiThemeProvider>
                <>
                <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item sm={3}></Grid>
                <Grid className={classes.formContent} item sm={6}>
                <div className={classes.formHeading}>Results</div>
                <h1>{(user&&user.PType)&& user.PType.name}</h1>
                <p className={classes.content}>Congratulations on taking the first step towards finding your ideal partner type.
                    Use the buttons below to edit your profile information, or get matching right away!
                </p>
                <span>
                <RaisedButton
                label="Check Profile"
                primary={true}
                style={styles.button}
                onClick={this.continue}
                />
                <RaisedButton
                label="See Matches!"
                primary={true}
                style={styles.button}
                onClick={this.checkMatches}
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

export default withStyles(useStyles)(Success);
