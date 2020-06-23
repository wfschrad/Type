//This component will house the matching ux

import React, { useState, useEffect } from 'react'

import { apiBaseUrl } from "./config";

export default function MatchArena() {
    const [matchThreshold, setMatchThreshold] = useState(2);//default to 'average match'
    const [prospects, setProspects] = useState([]);
    const handleThresholdChange = (ev) => {
        setMatchThreshold(ev.target.value);
    }

    useEffect(()=> {
        //fetch potential matches

        //make query string

        PROSPECT_QUERY = `
        `;

        //fetch prospects from db

        (async()=> {
            const prospectRes = await Axios({
                url: apiBaseUrl,
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    query: PROSPECT_QUERY
                }
            });
            console.log('prospectRes: ', prospectRes);
        })();

        //set new prospects array in state
    })

    return (
        //render material img cards of prospects
        //allow button selection (possibly add swipe functionality)
        //cards will need action listeners to persist user selection in db
        <div>

        </div>
    )
}
