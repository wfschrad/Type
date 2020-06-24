import React, { Component } from 'react'
import SideBar from './SideBar';
import ChatHeading from './ChatHeading';
import Messages from '../messages/Messages';
import MessageInput from '../messages/MessageInput';
import { MESSAGE_SENT, TYPING, COMMUNITY_CHAT, MESSAGE_RECEIVED, TYPING_RECEIVED } from '../events';


export default class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            activeChat: null
        };
    }

    componentDidMount() {
        const { socket } = this.props;
        socket.emit(COMMUNITY_CHAT, this.resetChat)
    }

    resetChat = (chat) => {
        return this.addChat(chat, true)
    }

    addChat = (chat, reset) => {
        const { socket } = this.props;
        const { chats } = this.state;

        const newChats = reset ? [chat] : [...chats, chat];
        this.setState({chats: newChats, activeChat: reset ? chat : this.state.activeChat });

        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`;
        const typingEvent = `${TYPING_RECEIVED}-${chat.id}`;

        socket.on(typingEvent, this.updateTypingInChat(chat.id));
        socket.on(messageEvent, this.addMessageToChat(chat.id));

    }

    updateTypingInChat = (chatId) =>{
		return ({isTyping, user})=>{
			if(user !== this.props.user.name){

				const { chats } = this.state

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
				this.setState({chats:newChats})
			}
		}
	}


    setActiveChat = (activeChat) => {
        this.setState({activeChat});
    }

    addMessageToChat = (chatId) => {
        console.log('addMessageToChat')
        console.log('chatId', chatId);
        return message => {
            const { chats } = this.state;
            let newChats = chats.map((chat) => {
                console.log('chat.id: ', chat.id)
                console.log('chatId: ', chatId)
                if (chat.id === chatId) {
                    chat.messages.push(message);
                    console.log('message', message)
                }
                return chat;
            });

            this.setState({chats: newChats});
        }
    }

    sendMessage = (chatId, message) => {
        const { socket } = this.props;
        socket.emit(MESSAGE_SENT, { chatId, message });
    }

    sendTyping = (chatId, isTyping) => {
        const { socket } = this.props;
        socket.emit(TYPING, { chatId, isTyping });
    }

    render() {
        const { user, logout } = this.props;
        const { chats, activeChat } = this.state;
        return (
            <div className='container'>
                <SideBar
                logout={logout}
                chats={chats}
                user={user}
                activeChat={activeChat}
                setActiveChat={this.setActiveChat}
                />
                <div className='chat-room-container'>
                    {
                        activeChat ? (
                            <div className='chat-room'>
                                <ChatHeading name={activeChat.name}/>
                                <Messages
                                messages={activeChat.messages}
                                user={user}
                                typingUsers={activeChat.typingUsers}
                                />
                                <MessageInput
                                sendMessage={(message) => this.sendMessage(activeChat.id, message)}
                                sendTyping={(isTyping) => this.sendTyping(activeChat.id, isTyping)}
                                />
                            </div>
                        ) : (
                            <div className='chat-room choose'>
                                <h3>Choose chat</h3>
                            </div>
                        )
                    }
               </div>
            </div>
        )
    }
}
