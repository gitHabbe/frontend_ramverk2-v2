import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    async onSubmit(e) {
        e.preventDefault();
        // const test = await axios.get("me-api.nhallberg.me/");
        console.log(this.state);
        
        console.log("submit");
    }
    
    render() {
        return (
            <div className="container">
                <div onSubmit={this.onSubmit.bind(this)} className="columns is-centered">
                    <form className="column is-one-third" method="post"><br/>
                        <div className="field">
                            <label htmlFor="email" className="label has-text-left">Email</label>
                            <input
                                onChange={this.onChange.bind(this)}
                                className="input is-rounded" name="email" type="text" placeholder="Email"></input>
                            <label htmlFor="password" className="label has-text-left">Password</label>
                            <input
                                onChange={this.onChange.bind(this)}
                                className="input is-rounded" name="password" type="text" placeholder="Password"></input>
                        </div>
                        <div className="field">
                            <button className="button is-link" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;