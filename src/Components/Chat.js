import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: ""
        }
        
    }

    componentDidMount() {
        let socket = io.connect("http://localhost:3000");
        this.setState({socket});
    }
    

    test() {
        this.state.socket.emit("msg", "test")
        console.log('TCL: Chat -> socket', this.state.socket);
        // this.state.socket.on("msg", msg => console.log(msg))
    }
    
    render() {
        return (
            <div>
                <ul className="chatLog"></ul>
                <button onClick={this.test.bind(this)}>ASDF</button>
            </div>
        )
    };
}

export default Chat;