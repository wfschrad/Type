import React from 'react'
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import '../styles/splash.css'

export default function Splash() {
    const history = useHistory();

    const redirect = () => {
        history.push('/account');
    }
    return (
        <div className={'container'}>
            <div className={'main-display'}>
                <p className={'main-display__content'}>Type uses relationship science to help you find your ideal
                    match based on personality-typing.
                </p>
                <p className={'main-display__content'}>
                    Just be yourself...we'll do the rest!
                </p>
                <button onClick={redirect} className={'splash-button'}>Get Started Today!</button>
            </div>
        </div>
    )
}
