import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: "1",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: "2",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    // Gives context to so we can access this.setState in the function
    this.sendNewMessage = this.sendNewMessage.bind(this);

  }

  // Functions can be sent down the props river too!
  sendNewMessage(messageToSend) {
    const id = Math.round(Math.random() * 1000000000);
    const newMessage = {
      id: id,
      username: messageToSend.currentUser,
      content: messageToSend.content
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
    this.socket.send(JSON.stringify(newMessage));
  }

  // Fires when the App component is finished setting up
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = function (event) {
      console.log(event.data);
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
