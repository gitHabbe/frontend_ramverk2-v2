import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

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

    connect = async (e) => {
        let socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`);
        let log = await axios.get(`http://localhost:1337/getlogsmall`);
        let msgList = log.data.slice(0, 5).reverse().map(entry => {
            const newDate = new Date(entry.date);
            return (
                <tr key={newDate + entry.charMsg}>
                    <td>{newDate.getHours() + ":" + newDate.getMinutes()}</td>
                    <td><strong>{entry.username}: </strong></td>
                    <td>{entry.chatMsg}</td>
                </tr>
            );
        });
        this.setState({msgs: msgList});
        socket.on("msg", async msg => {
            const msgDate = new Date(msg.date);
            const newMsg =
                <tr key={msg.date + msg.chatMsg}>
                    <td>{msgDate.getHours() + ":" + msgDate.getMinutes()}</td>
                    <td><strong>{msg.username}: </strong></td>
                    <td>{msg.chatMsg}</td>
                </tr>
            const test = await axios.post(`http://localhost:1337/new-msg`,
                {
                    username: msg.username,
                    chatMsg: msg.chatMsg,
                    date: msgDate
                }
            );
            console.log('TCL: Chat -> test', test)

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
        this.setState({chatMsg: ""});
        console.log('TCL: Chat -> connect -> this.state.msgs', this.state.msgs)

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
        // console.log("this.state.msgs", this.state.msgs);
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
