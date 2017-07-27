import React, { Component } from 'react';

class Message extends Component {
    // Use a ternary to hide and show components based on message properties -- very cool
    render() {
        console.log("Rendering <Message/>");
        return (
            <div>
                <div className={"message system " + (this.props.message.type == 'incomingNotification' ? 'show' : 'hidden')}>
                    {this.props.message.content}
                </div>

                <div className="message">
                    <span className={"message-username " + (this.props.message.type == 'incomingMessage' ? 'show' : 'hidden')}>{this.props.message.username}</span>
                    <span className={"message-content " + (this.props.message.type == 'incomingMessage' ? 'show' : 'hidden')}>{this.props.message.content}</span>
                </div>
            </div>
        );
    }
}
export default Message;