import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import VideoCallIcon from '@material-ui/icons/VideoCall';

export default function ChatHeading({ name, numberOfUsers }) {
    return (
        <div className='chat-header'>
            <div className='user-info'>
                <div className='user-name'>{name}</div>
                <div className='status'>
                    <div className='indicator'></div>
                    <span>{numberOfUsers && numberOfUsers}</span>
                </div>
            </div>
        <div className='options'>
            <VideoCallIcon/>
            <PersonAddIcon/>
            <KeyboardIcon/>

        </div>
        </div>
    )
}
