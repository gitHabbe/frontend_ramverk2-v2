import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: "",
            username: "",
            chatMsg: "",
            msgs: [],
            isConnected: false
        }
        
    }

    componentDidMount() {
        
    }
    
    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    connect = (e) => {
        let socket = io.connect("http://localhost:3002");
        socket.on("msg", msg => {
            const msgDate = new Date(msg.date);
            const newMsg =
                <tr key={msg.data + msg.charMsg}>
                    <td>{msgDate.getHours() + ":" + msgDate.getMinutes()}</td>
                    <td><strong>{msg.username}: </strong></td>
                    <td>{msg.chatMsg}</td>
                </tr>
            this.setState({msgs: [...this.state.msgs, newMsg]})
        });
        socket.on("userleave", (test) => {
            const date = new Date();
            const newMsg =
                <tr>
                    <td>{date.getHours() + ":" + date.getMinutes() + "..."}</td>
                    <td><strong>User has left</strong></td>
                    <td></td>
                </tr>
            this.setState({msgs: [...this.state.msgs, newMsg]})
        });
        this.setState({socket, isConnected: true, chatMsg: ""});
    }
    sendMsg() {
        this.state.socket.emit("msg", {
            username: this.state.username,
            chatMsg: this.state.chatMsg,
            date: new Date()
        });
        if (this.state.msgs.length > 4) {
            let newArray = [...this.state.msgs];
            newArray.shift();
            this.setState({msgs: newArray});
        }
        // console.log("Sent msg: ", this.state.chatMsg);
    }
    
    render() {
        const { isConnected } = this.state;
        console.log("this.state.msgs", this.state.msgs);
        return (
            <div className="container"><br/>
                <div className="columns is-centered">
                    <div className="column is-three-qouters chatLog">
                        <table className="table">
                            <thead></thead>
                            <tbody>
                                {this.state.msgs}
                            </tbody>
                        </table>
                    </div>
                    <div className="column is-one-quarter">
                        { isConnected
                            ? <input onChange={this.onChange.bind(this)} type="text" name="chatMsg" id="chatMsg" placeholder="Chat msg" />
                            : <input onChange={this.onChange.bind(this)} type="text" name="username" id="username" placeholder="username" />
                        }
                        
                        { isConnected
                            ? <button onClick={this.sendMsg.bind(this)}>Send message</button>
                            : <button onClick={this.connect.bind(this)}>Connect to chat</button>
                        }
                    </div>
                </div>
            </div>
        )
    };
}

export default Chat;