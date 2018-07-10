import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const messages = this.props.messages
        const listOfMessage = messages.map((message, index) => 
        <div key={index}>
        < Message message={message} />
        </div>

    )
        return (
            <main className="messages">
            {listOfMessage}
            <div className="message system">
                Anonymous1 changed their name to.
            </div>
            </main>
        )
    }
}
export default MessageList;