import React, { Component } from 'react';

class NavBar extends Component {

    render() {
        console.log("Rendering <Message/>");
        return (
            <div>
                <nav className="navbar">
                    <a href="/" className="navbar-brand">Chatty</a>
                    <h1 className="navbar-counter">{ this.props.counter } users online</h1>
                </nav>
            </div>
        );
    }
}
export default NavBar;