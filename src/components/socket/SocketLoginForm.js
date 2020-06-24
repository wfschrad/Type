import React, { Component } from 'react'

import { VERIFY_USER } from './events';

export default class SocketLoginForm extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);
        debugger;
        this.state = {
            nickname: '',
            error: ''
        };
    }

    setUser = ({ user, isUser }) => {
        console.log(`user: ${user}, isUser: ${isUser}`);
        if (isUser) {
            this.setError('User name taken');
        } else {
            this.props.setUser(user);
            this.setError('');
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const { socket } = this.props;
        const { nickname } = this.state;
        socket.emit(VERIFY_USER, nickname, this.setUser);
    }

    handleChange = (ev) => {
        this.setState({nickname:ev.target.value});
    }

    setError = (error) => {
        this.setState({error})
    }

    render() {
        const { nickname, error } = this.state;
        return (
            <div className='login'>
                <form onSubmit={this.handleSubmit} className='login-form'>
                    <label htmlFor='nickname'>
                        <h2>Enter Nickname</h2>
                    </label>
                    <input
                    ref={(input) => {this.textInput = input}}
                    type='text'
                    id='nickname'
                    value={nickname}
                    onChange={this.handleChange}
                    placeHolder={'Username'}
                    />
                    <div className='error'>{error && error}</div>
                </form>
            </div>
        )
    }
}
