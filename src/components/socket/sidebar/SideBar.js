import React, { Component } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import EjectIcon from '@material-ui/icons/Eject';
import SideBarOption from './SideBarOption';
import { get, last, differenceBy } from 'lodash';
import { createChatNameFromUsers } from '../Factories';

export default class SideBar extends Component{
	static types = {
		CHATS: 'chats',
		USERS: 'users'
	}
	constructor(props) {
		super(props);
		this.state = {
			receiver: null,
			activeSideBar: SideBar.types.CHATS
		}
	}

	handleSubmit = (ev) => {
		ev.preventDefault();
		const { receiver } = this.state;
		const { onSendPrivateMessage } = this.props;
		onSendPrivateMessage(receiver);
		this.setState({receiver: null});
	}

	addChatForUser = (username) => {
		this.props.onSendPrivateMessage(username);
		this.setActiveSideBar(SideBar.types.CHATS);
	}

	// handleFormChange (ev) {
	// 	this.setState({ receiver: ev.target.value })
	// }

	setActiveSideBar = (newSideBar) => {
		this.setState({ activeSideBar: newSideBar})
	}

	render(){
		const { chats, activeChat, user, setActiveChat, logout, users } = this.props
		const { receiver, activeSideBar } = this.state;
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Type <KeyboardArrowDownIcon /></div>
						<div className="menu">
							<MenuIcon />
                            <div>Menu</div>
						</div>
					</div>
					{/* above is verified */}
					<form onSubmit={this.handleSubmit} className="search" >
						<i className="search-icon"><SearchIcon /></i>
						<input
						value={receiver}
						onChange={(ev) => this.setState({ receiver: ev.target.value })}
						placeholder="Search"
						type="text"
						/>
						<div className="plus"></div>
					</form>
					<div className='side-bar-select'>
						<div
						className={`side-bar-select__option ${(activeSideBar === SideBar.types.CHATS) && 'active'}`}
						onClick={() => {this.setActiveSideBar(SideBar.types.CHATS)}}
						>
							<span>Chats</span>
						</div>
						<div
						className={`side-bar-select__option ${(activeSideBar === SideBar.types.USERS) &&  'active'}`}
						onClick={() => {this.setActiveSideBar(SideBar.types.USERS)}}
						>
							<span>Users</span>
						</div>


					</div>
					<div
						className="users"
						ref='users'
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>

						{
							activeSideBar === SideBar.types.CHATS ?
						chats.map((chat)=>{
							if(chat.name){
								const lastMessage = chat.messages[chat.messages.length - 1];
								const chatMessageName = chat.users.find((name)=> {
									return name !== user.name
								}) || 'Community'
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''

								return(
								<SideBarOption
								key={chat.id}
								name={chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}
								lastMessage={get(last(chat.messages), 'message', '')}
								active={activeChat.id === chat.id }
								onClick={() => { this.props.setActiveChat(chat)}}
								/>
							)
							}
							return null
						})

						:
							differenceBy(users, [user], 'name').map((otherUser) => {
								return (
									<SideBarOption
									key={otherUser.id}
									name={otherUser.name}
									onClick={() => {this.addChatForUser(otherUser.name)}}
									/>
								)
							})
						}

					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							<EjectIcon/>
						</div>
					</div>
			</div>
		);

	}
}
