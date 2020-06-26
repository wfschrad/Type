import './socket.css';

import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from './events.js';

import SocketLoginForm from './SocketLoginForm';
import ChatContainer from './chats/ChatContainer';

const socketUrl = 'http://localhost:8081';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            user: null
        }
    }

    componentWillMount() {
        this.initSocket();
    }

    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => console.log('socket connected'));
        this.setState({socket});
    }

    setUser = (user) => {
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({ user })
    }

    logout = () => {
        const { socket } = this.state;
        socket.emit(LOGOUT);
        this.setState({ user: null });
    }

    render() {
        const { title } = this.props;
        const { socket, user } = this.state;
        return (
            <div className='socket__container'>
                {
                    !user
                        ? <SocketLoginForm socket={socket} setUser={this.setUser}/>
                        : <ChatContainer socket={socket} user={user} logout={this.logout}/>
                }
            </div>
        )
    }
}
