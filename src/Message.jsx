import React, {Component} from 'react';

class Message extends Component {
    render() {
        return (
        <div className="message">
            <span className="message-username" style={{color: this.props.color}} >{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        )
    }
}

export default Message;