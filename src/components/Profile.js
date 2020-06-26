import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from "../react-auth0-spa";
import { apiBaseUrl } from "../config";
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
    contentBox: {
        height: 360,
        width: 360,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    picGrid: {
        marginLeft: 140
    }
}))

const Profile = ({ match: { params: { userId }}}) => {
    const classes = useStyles();
    const { loading, user } = useAuth0();
    const [typeUser, setTypeUser] = useState(null);

    // if (loading || !user) {
    //     return <div>Loading...</div>;
    // }

    useEffect(() => {
        (async ()=> {
            const PROFILE_QUERY = `
                {
                    user(userId: ${userId}) {
                        uploadedPhoto
                        preferredName
                        PType {
                            name
                            description
                        }
                        age
                        bio
                    }
                }
            `;

            const res = await Axios({
                url: apiBaseUrl,
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
                method: "post",
                data: {
                    query: PROFILE_QUERY,
                },
            });
            console.log('res data: ', res.data.data);
            const user = res.data.data.user;
            console.log('profile user: ', user);
            setTypeUser(user);
            // if (addUser) {

        })();
    },[]);

    return typeUser && (
        <Grid container className={classes.mainContainer} spacing={2}>
            <Grid item xs={12}>
                <Grid container className={classes.picGrid}>
                    <Grid item xs={5} >
                        <img src={typeUser.uploadedPhoto} alt="Profile" width="360" height="360" />
                    </Grid>
                    <Grid className={classes.contentBox} item xs={7}>
                        <div>{typeUser.PType.name}</div>
                        <div>{typeUser.PType.description}</div>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}



        // <>
        //     <Grid container className={classes.gridContainer} spacing={2}>

        //         <Grid item sm={1}></Grid>
        //         <Grid item xs={12} sm={5}>
        //             <img src={user.picture} alt="Profile" width="360" height="360" />
        //             {/* /*style={{ 'border-radius': '50%' }} />*/}

        //             < h2 > {user.nickname}</h2>
        //         </Grid>
        //         <Grid item xs={12} sm={4}>
        //             <div className={classes.bioContainer}>
        //                 <code>{JSON.stringify(user, null, 2)}</code>
        //             </div>
        //         </Grid>
        //         <Grid item sm={1}></Grid>
        //     </Grid>
        // </>

export default Profile;
