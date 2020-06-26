const uuid = require('uuid').v4;

const createUser = ({name='', socketId=null} = {}) => (
    {
        id: uuid(),
        name,
        socketId
    }
)

const createMessage =({message='', sender=''}={}) =>(
    {
        id:uuid(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
)

const createChat = ({messages = [], name = "Community", users = [], isCommunity = false} = {})=>(
	{
		id:uuid(),
		name: isCommunity ? name : createChatNameFromUsers(users),
		messages,
		users,
		typingUsers:[],
		isCommunity
	}
)

const createChatNameFromUsers = (users, excludedUser='') => {
    return users.filter(user => user !== excludedUser).join(' & ') || 'Empty Users';
}

const getTime = (date) => {
    return `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
}

module.exports = {
    createMessage,
    createChat,
    createUser,
    createChatNameFromUsers
}
