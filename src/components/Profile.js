import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { findByLabelText } from "@testing-library/react";


const useStyles = makeStyles((theme) => ({
    gridContainer: {
        marginTop: 20
    },
    bioContainer: {
        height: 360,
        width: 360,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }

}))

const Profile = () => {
    const { loading, user } = useAuth0();
    const classes = useStyles();


    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Grid container className={classes.gridContainer} spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <img src={user.picture} alt="Profile" width="360" height="360" />
                    {/* /*style={{ 'border-radius': '50%' }} />*/}

                    < h2 > {user.nickname}</h2>
                </Grid>
                <Grid item xs={5}>
                    <div className={classes.bioContainer}>
                        <code>{JSON.stringify(user, null, 2)}</code>
                    </div>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </>
    );
};

export default Profile;