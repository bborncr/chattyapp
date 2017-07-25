import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import uuidv1 from 'uuid/v1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    // Gives context to so we can access this.setState in the function
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.receiveNewMessage = this.receiveNewMessage.bind(this);

  }

  // Functions can be sent down the props river too!
  sendNewMessage(messageToSend) {
    // Generate UUID
    const id = uuidv1();
    const newMessage = {
      id: id,
      username: messageToSend.currentUser,
      content: messageToSend.content
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
    this.socket.send(JSON.stringify(newMessage));
  }

  receiveNewMessage(incomingData){
    const newMessage = incomingData;
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
  }

  // Fires when the App component is finished setting up
  componentDidMount() {
    //Creates new socket and connects to chattyserver
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (event) => {
      console.log("Incoming message:",event.data);
      const data = JSON.parse(event.data);
      this.receiveNewMessage(data);
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendNewMessage={this.sendNewMessage} />
      </div>
    );
  }
}
export default App;