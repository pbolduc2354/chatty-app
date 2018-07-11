import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'



class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
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


    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  changeUser = e => {
    if(e.key == "Enter"){
      if (e.target.value.length > 0){
        console.log("holla")
        const newUser = {name: e.target.value}
        this.setState({currentUser: newUser })
        e.target.value = "";
      } else {
      alert("Can't use an empty username")
    } 
    }
  }

  receiveMessage = e => {
    const newMessage = JSON.parse(e.data);
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages : messages})
  }

  handleNewMessage = e => {
    if(e.key == "Enter"){
      const newMessage = {type: 'message', username: this.state.currentUser.name, content: e.target.value} 
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  }


  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar handleNewMessage={this.handleNewMessage} changeUser={this.changeUser} currentUser={this.state.currentUser.name}/>
  </div>
    );
  }
}


export default App;
