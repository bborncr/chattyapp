import React, { Component } from 'react';

class ChatBar extends Component {
    // Always put props in here
    constructor(props) {
        super(props);
        
        // Set initial state
        this.state = {
            currentUser: "Anonymous"
        }

        // Gives context to this.onSubmit so we can access this.setState in the onSubmit function
        this.onUserChange = this.onUserChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    // When the user changes nickname update the state of the currentUser and sends notification
    onUserChange(event) {
        const newCurrentUser = event.target.value;
        const setCurrentUser = {
            currentUser: newCurrentUser
        }
        this.setState(setCurrentUser);
        this.props.sendNewNicknameNotification(newCurrentUser);
    }

    onSubmit(event) {
        // When the Enter key is pressed update the content and clear the input field
        if (event.key === 'Enter') {
            const message = {
                type: "incomingMessage",
                currentUser: this.state.currentUser,
                content: event.target.value
            }
            // Re-renders if content has changed
            this.setState(message);
            // Clears the input field
            event.target.value = '';
            this.props.sendNewMessage(message);
        }

    }

    render() {
        console.log("Rendering <ChatBar/>");
        return (
            <footer className="chatbar">
                <input className="chatbar-username" onBlur={this.onUserChange} defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
                <input onKeyDown={this.onSubmit} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}
export default ChatBar;