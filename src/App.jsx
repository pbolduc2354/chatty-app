import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'



class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: {name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      countUserOnline: 0,
      userColor: ""
    };
    this.socket = new WebSocket("ws://localhost:3001/");
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");


    this.socket.onopen = e => {
      console.log('Connected to server');
      // ws.send("Here's some text that the server is urgently awaiting!"); 
    };

    this.socket.addEventListener("message", this.receiveMessage);
  }

  changeUser = e => {
    if(e.key == "Enter"){
      if (e.target.value.length > 0){
        const newUser = {type: "postNotification", name: e.target.value};
        newUser.content = `${this.state.currentUser.name} has changed their name to ${newUser.name}`;
        this.socket.send(JSON.stringify(newUser));
        this.setState({currentUser: newUser});
        e.target.value = "";
      } else {
      alert("Can't use an empty username");
    } 
    }
  }

  receiveMessage = e => {
    const newMessage = JSON.parse(e.data);
    // console.log(newMessage)

    switch(newMessage.type) {
      case "incomingMessage":
        const messages = this.state.messages.concat(newMessage);
        this.setState({messages : messages});
      break;

      case "incomingNotification":
        const newUser = newMessage
        console.log(newUser.content);
        const othermessage = this.state.messages.concat(newUser);
        this.setState({ messages: othermessage })
      break;

      case "userOnline":
        const status = newMessage.count
        this.setState({countUserOnline: status})
        console.log(status)
      break;

      case "userColor":
      this.setState({ userColor: newMessage.color })
      console.log(this.state.userColor);
         console.log(this.state)
        // this.setState({countUserOnline: status})
        // console.log(status)
      break;
    }



  }

  handleNewMessage = e => {
    if(e.key == "Enter"){
      const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: e.target.value} 
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  }


  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <a className="countUserOnline">{this.state.countUserOnline} Users online</a>
      </nav>
      <MessageList messages={this.state.messages} color={this.state.userColor}/>
      <ChatBar handleNewMessage={this.handleNewMessage} changeUser={this.changeUser} currentUser={this.state.currentUser.name}/>
  </div>
    );
  }
}


export default App;
