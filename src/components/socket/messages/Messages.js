import React, { Component } from 'react'

export default class Messages extends Component {
    render() {
        const { messages, user, typingUsers } = this.props;
        return (
            <div ref='container' className='thread-container'>
                <div className='thread'>
                    {
                        messages.map((message) => {
                            return (
                                <div
                                    key={message.id}
                                    className={`message-container ${message.sender === user.name && 'right'}`}
                                >
                                    <div className='time'>{message.time}</div>
                                    <div className='data'>
                                        <div className='message'>{message.message}</div>
                                        <div className='name'>{message.sender}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        typingUsers.map((name) => {
                            return (
                                <div key={name} className='typing-user'>
                                    {`${name} is typing...`}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
