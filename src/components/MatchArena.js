//This component will house the matching ux

import React, { useState, useEffect } from 'react'
import Axios from 'axios';

import { apiBaseUrl } from "../config";

export default function MatchArena() {
    const [matchThreshold, setMatchThreshold] = useState(2);//default to 'average match'
    const [prospects, setProspects] = useState([]);
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
                setProspects(prospectRes.data.data.prospects)
                debugger;
            })();

        //set new prospects array in state
    }, []);

    return (
        //render material img cards of prospects
        //allow button selection (possibly add swipe functionality)
        //cards will need action listeners to persist user selection in db
        <div>
            {prospects && prospects.map(prospect => (
                <div
                    key={prospect.id}>
                    {`prospectId: ${prospect.id}; prefName: ${prospect.preferredName}`}
                </div>

            ))}
        </div>
    )
}
