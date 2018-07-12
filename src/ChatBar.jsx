import React, {Component} from 'react';

// ChatBar is the component the create the navbar and display the number of user online. 
class ChatBar extends Component {
  render() {

    return (
        <footer className="chatbar">
                <input className="chatbar-username" placeholder={this.props.currentUser} onKeyPress={this.props.changeUser}/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.handleNewMessage} />
        </footer>
    );
  }
}
export default ChatBar;
// create a form to use onSumbit then use handle submit