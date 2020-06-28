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
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 30,
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 60
    },
    picGrid: {
        marginLeft: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    userName: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 10,
        fontWeight: 700,
        marginLeft: 140,
        fontSize: 18
    },
    typeHead: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 700,
        marginBottom: 20,
        marginTop: 20

    },
    contentBottom: {
        marginLeft: 30
    },
    infoHeading: {
        fontWeight: 700
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
        <div className={classes.mainContainer} >
                <div className={classes.picGrid}>
                    <img src={typeUser.uploadedPhoto} alt="Profile" width="360" height="360" />
                    <div className={classes.userName}>{typeUser.preferredName}</div>
                </div>

                    <div className={classes.contentBox} >
                        <div>
                            <div className={classes.typeHead}>{typeUser.PType.name.toUpperCase()}</div>
                            <div>{typeUser.PType.description}</div>
                        </div>
                        <div className={classes.contentBottom}>
                            <div><span className={classes.infoHeading}>Age: </span>{typeUser.age}</div>
                            <div style={{marginTop: '10px'}}><span className={classes.infoHeading}>Bio: </span>{typeUser.bio}</div>
                        </div>

                </div>
            </div>
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
