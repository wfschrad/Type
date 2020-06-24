import './socket.css';

import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from './events.js';

import SocketLoginForm from './SocketLoginForm';

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
        const { socket } = this.state;
        return (
            <div className='socket__container'>
                {title}
                <SocketLoginForm socket={socket} setUser={this.setUser}/>
            </div>
        )
    }
}
