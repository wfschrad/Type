import React from 'react'
import { useAuth0 } from "../react-auth0-spa";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


import Upload from './PhotoUpload';


const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        MarginBottom: "10px",
        padding: 20,
        justifyContent: 'center'
    },
}));

export default function Account() {
    const classes = useStyles();
    const { user } = useAuth0();

    return (
        <>
            <Box className={classes.container}>
                <h1>This is where User will be able to configure settings or change content</h1>
            </Box>
        </>
    )
}
