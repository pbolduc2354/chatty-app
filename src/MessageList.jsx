import React, {Component} from 'react';
import Message from './Message.jsx';

// Message list is the component that render all the chat messages and notifications

class MessageList extends Component {
    render() {
        const messages = this.props.messages
        const color = this.props.color

// listOfMessage create an array for each message in the messages variable
// listOfMessage use an if statement that use the type of the message to see if its a notification or a message.
// Depending of the type listOfMessage will return different things and will be render with messageList
        const listOfMessage = messages.map((message) => {
        console.log(message.type);


        if(message.type === "incomingMessage"){
            return(
            <div key={message.id}>
            < Message color={color} message={message} />
            </div>
            )
        } else {
            return(
            <div key={message.id} className="notification message system">
                <span className="notification-content">
                    < Message message={message} />
                </span>
            </div>
            )
        }  
    })
    // this is the message list return that takes listOfMessage
        return (
            <main className="messages">
            {listOfMessage}
            </main>
        )
    }
}
export default MessageList;