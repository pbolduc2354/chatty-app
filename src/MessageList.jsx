import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const messages = this.props.messages
        const color = this.props.color
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
        return (
            <main className="messages">
            {listOfMessage}
            </main>
        )
    }
}
export default MessageList;