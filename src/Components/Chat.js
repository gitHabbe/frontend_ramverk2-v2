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

        this.onSubmit = this.onSubmit.bind(this);
        
    }
    
    onChange = e => this.setState({[e.target.name]: e.target.value});
    onSubmit = e => e.preventDefault();

    connect = e => {
        let socket = io.connect("http://localhost:3002");
        socket.on("msg", msg => {
            const msgDate = new Date(msg.date);
            const newMsg =
                <tr key={msg.date + msg.chatMsg}>
                    <td>{msgDate.getHours() + ":" + msgDate.getMinutes()}</td>
                    <td><strong>{msg.username}: </strong></td>
                    <td>{msg.chatMsg}</td>
                </tr>
            this.setState({msgs: [...this.state.msgs, newMsg]})
        });
        socket.on("userleave", () => {
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
    }

    getConnectForm = () => {
        return <form
            onSubmit={this.onSubmit.bind(this)}
            className="form">
            <input
                onChange={this.onChange.bind(this)}
                className="input"
                value={this.state.username}
                type="text"
                name="username"
                placeholder="Choose username.."
            />
            <button
                onClick={this.connect.bind(this)}
                className="button is-info"
                type="submit"
            >Connect</button>
        </form>
    }

    getMessageForm = () => {
        return <form
            onSubmit={this.onSubmit.bind(this)}
            className="form">
            <input
                onChange={this.onChange.bind(this)}
                className="input"
                value={this.state.chatMsg}
                type="text"
                name="chatMsg"
                placeholder="Message..."
            />
            <button
                onClick={this.sendMsg.bind(this)}
                className="button is-success"
                type="submit"
            >Send message</button>
        </form>
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
                        { isConnected ? this.getMessageForm() : this.getConnectForm() }
                    </div>
                </div>
            </div>
        )
    };
}

export default Chat;