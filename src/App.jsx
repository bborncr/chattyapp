import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import uuidv1 from 'uuid/v1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: []

    };

    // Gives context to so we can access this.setState in the function
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.receiveNewMessage = this.receiveNewMessage.bind(this);
    this.sendNewNicknameNotification = this.sendNewNicknameNotification.bind(this);

  }

  // 
  sendNewNicknameNotification(newUser) {
    // Generate UUID
    const id = uuidv1();
    const newMessage = {
      id: id,
      type: "postNotification",
      username: newUser,
      content: `${this.state.currentUser.name} has changed their name to ${newUser}.`
    };
    const updateCurrentUser = { name: newUser };
    this.setState({ currentUser: updateCurrentUser });
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
    this.socket.send(JSON.stringify(newMessage));

  }

  // Functions can be sent down the props river too!
  sendNewMessage(messageToSend) {
    // Generate UUID
    const id = uuidv1();
    const newMessage = {
      id: id,
      type: "postMessage",
      username: messageToSend.currentUser,
      content: messageToSend.content
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
    this.socket.send(JSON.stringify(newMessage));
  }

  // Handles different data types
  receiveNewMessage(data) {
    switch (data.type) {
      case "incomingMessage":
        const smessages = this.state.messages.concat(data);
        this.setState({ messages: smessages });
        break;
      case "incomingNotification":
        // data.type = "postNotification";
        const nmessages = this.state.messages.concat(data);
        this.setState({ messages: nmessages });
        console.log("Received notificaton");
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  }

  // Fires when the App component is finished setting up
  componentDidMount() {
    //Creates new socket and connects to chattyserver
    this.socket = new WebSocket("ws://localhost:3001");

    // onopen event detects when connection to websocket server is acheived
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    // onmessage event --> Receives incoming message, converts to JSON object and handles the incoming data 
    this.socket.onmessage = (event) => {
      console.log("Incoming message:", event.data);
      const data = JSON.parse(event.data);
      this.receiveNewMessage(data);
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendNewMessage={this.sendNewMessage} sendNewNicknameNotification={this.sendNewNicknameNotification} />
      </div>
    );
  }
}
export default App;