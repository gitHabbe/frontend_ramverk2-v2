import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: "",
            chatMsg: ""
        }
        
    }

    componentDidMount() {
        let socket = io.connect("http://localhost:3000");
        this.setState({socket});
    }
    
    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    sendMsg() {
        this.state.socket.emit("msg", this.state.chatMsg);
    }
    
    render() {
        return (
            <div>
                <ul className="chatLog"></ul>
                <input onChange={this.onChange.bind(this)} type="text" name="chatMsg" id="chatMsg" placeholder="Chat msg" />
                <button onClick={this.sendMsg.bind(this)}>ASDF</button>
            </div>
        )
    };
}

export default Chat;