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
    console.log("Message to send:", messageToSend);
    const id = Math.round(Math.random() * 1000000000);
    const newMessage = {
      id: id,
      username: messageToSend.currentUser,
      content: messageToSend.content
    };
    // Dies here!!
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
  }

  // Fires when the App component is finished setting up
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const id = Math.round(Math.random() * 1000000000);
      const newMessage = { id: id, username: "Michelle", content: id };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
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
