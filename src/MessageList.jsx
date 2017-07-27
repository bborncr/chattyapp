import React, { Component } from 'react';
import Message from './Message.jsx';

// Use .map to pull the individual messages and format them as <Message> tags
class MessageList extends Component {

    render() {
        console.log("Rendering <MessageList/>");
        return (
            <div id="message-list">
                {
                    this.props.messages.map((message) => {
                        return (
                            <Message key={ message.id } message={ message } />
                        )
                    })
                }
            </div>
        );
    }
}
export default MessageList;


