//This component will house the matching ux

import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


import { apiBaseUrl } from '../config';
import ProspectCard from './material_blocks/ComplexInteractionCard';

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
        marginBotton: 30
    }
}))


export default function MatchArena() {
    const [matchThreshold, setMatchThreshold] = useState(2);//default to 'average match'
    const [prospects, setProspects] = useState([]);
    const [activeProspect, setActiveProspect] = useState(null);
    const classes = useStyles();



    const handleThresholdChange = (ev) => {
        setMatchThreshold(ev.target.value);
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
                    debugger;
                }
            })();

        //set new prospects array in state
    }, []);

    return (
        //render material img cards of prospects
        //allow button selection (possibly add swipe functionality)
        //cards will need action listeners to persist user selection in db
        <> {activeProspect &&
            <Grid container className={classes.mainContainer} spacing={2}>
                <Grid container className={classes.prospectRow} spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <ProspectCard
                        name={activeProspect.preferredName}
                        typeName={activeProspect.PType.name}
                        bio={activeProspect.bio}
                        upload={activeProspect.uploadedPhoto}
                        defaultPic={activeProspect.profilePhoto}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
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
