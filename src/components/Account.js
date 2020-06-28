import React from 'react'
import { useAuth0 } from "../react-auth0-spa";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


import Upload from './PhotoUpload';
import BioModal from './material_blocks/Modal';


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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    userName: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 10,
        fontWeight: 700,
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

export default function Account() {
    const classes = useStyles();
    const { user } = useAuth0();

    // const showBioModal = () => {

    // }

    return user ? (
        <div className={classes.mainContainer} >
                <div className={classes.picGrid}>
                    <img src={user.picture} alt="Profile" width="360" height="360" />
                    <div className={classes.userName}>{user.preferredName}</div>
                </div>

                    <div className={classes.contentBox} >
                        <div>
                            <div className={classes.typeHead}>
                                <Upload/>
                            </div>
                            <BioModal style={{marginTop: 30}}
                                user={user}
                            />
                        </div>
                       </div>
        </div>
    ) : <div>Loading...</div>
}
