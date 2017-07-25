import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    
    render() {
        console.log("Rendering <MessageList/>");
        return (
            <div id="message-list">
                <div className="message system">
                </div>
                {
                    this.props.messages.map((message) => {
                        return (
                            <Message key={message.id} message={message} />
                        )
                    })
                }
            </div>
        );
    }
}
export default MessageList;


