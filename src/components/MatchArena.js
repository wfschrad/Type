//This component will house the matching ux

import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "../react-auth0-spa";


import { apiBaseUrl } from '../config';
import ProspectCard from './material_blocks/ComplexInteractionCard';
// import ThreshForm from './ThreshFormBody';
import ThreshForm from './VerticalThresh';

import Paper from './material_blocks/Paper';

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
        marginTop: 60,
    },
    picGrid: {
        marginLeft: 140
    },
    prospectRow: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 30
    },
    threshForm: {
        display: 'flex',
        width: '100%',
        height: 600,
        justifyContent: 'center',
        marginLeft: 400
    },
    formPaper: {
        width: '100%'
    },
    innerWrapper: {
        display: 'flex',
        justifyContent: 'center'
    }
}))


export default function MatchArena() {
    const [matchThreshold, setMatchThreshold] = useState(2);//default to 'average match'
    const [prospects, setProspects] = useState([]);
    const [activeProspect, setActiveProspect] = useState(null);
    const classes = useStyles();

    const { user } = useAuth0();
    const { getTokenSilently } = useAuth0();


    const setMatch = async () => {
        const token = await getTokenSilently();
        console.log('set match hit');

        const MATCH_QUERY = `
            F
        `;

    }

    const setDenial = async () => {
        const token = await getTokenSilently();

    }




    useEffect(() => {
        //fetch potential matches
        console.log('in use effect')

        //make query string

        const PROSPECT_QUERY = `
            {
                prospects(userId:1, userPTypeId:13, relThresh:2){
                    id
                    PType{
                        name
                        description
                    }
                    preferredName
                    bio
                    uploadedPhoto
                    profilePhoto
                }
            }
        `;
        console.log('match query');
            //fetch prospects from db

            (async () => {
                const prospectRes = await Axios({
                    url: apiBaseUrl,
                    method: 'post',
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                    data: {
                        query: PROSPECT_QUERY
                    }
                });
                console.log('prospectRes.data.data: ', prospectRes.data.data);
                const fetchedProspects = prospectRes.data.data.prospects;
                if (fetchedProspects && fetchedProspects.length > 0) {
                    setActiveProspect(fetchedProspects[0]);
                    setProspects(fetchedProspects.slice(1));
                }
            })();

        //set new prospects array in state
        console.log('matchThreshold: ', matchThreshold)
    }, [matchThreshold]);

    return (
        //render material img cards of prospects
        //allow button selection (possibly add swipe functionality)
        //cards will need action listeners to persist user selection in db
        <> {(activeProspect && user) &&
            <Grid container className={classes.mainContainer} spacing={1}>
                <Grid container className={classes.prospectRow} spacing={1}>
                    <Grid item xs={2}></Grid>
                    <div className={classes.innerWrapper}>

                    </div>
                    <Grid item xs={4}>
                        <ProspectCard
                        name={activeProspect.preferredName}
                        typeName={activeProspect.PType.name}
                        bio={activeProspect.bio}
                        upload={activeProspect.uploadedPhoto}
                        defaultPic={activeProspect.profilePhoto}
                        setMatch={setMatch}
                        setDenial={setDenial}
                        userId={user.id}
                        prospectId={activeProspect.id}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <ThreshForm
                        setMatchThreshold={setMatchThreshold}/>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                {/* <Grid container className={classes.formWrapper} spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={2}></Grid> */}

                    {/* <div className={classes.threshForm} spacing={2}> */}
                        {/* Radios here */}

                    {/* </div> */}
                {/* {/* </Grid> */}
            </Grid>
}
            {/* {prospects && prospects.map(prospect => (
                <div
                    key={prospect.id}>
                    {`prospectId: ${prospect.id}; prefName: ${prospect.preferredName}`}
                </div>

            ))} */}
        </>
    )
}
