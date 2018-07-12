import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const messages = this.props.messages
        const listOfMessage = messages.map((message) => {
        console.log(message.type);

        if(message.type === "incomingMessage"){
            return(
            <div key={message.id}>
            < Message message={message} />
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