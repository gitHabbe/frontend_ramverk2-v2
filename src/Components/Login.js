import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
axios.defaults.headers.common['Authorization'] =
    "Bearer " + localStorage.getItem('jwt');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false
        }

    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    async onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        // const login = await axios.post("https://me-api.nhallberg.me/login/", {
        const login = await axios.post("http://localhost:8333/login/", {
            'email': email,
            'password': password
        });
        if (login.data) {
			console.log('TCL: onSubmit -> login.data', login.data)
            localStorage.setItem("jwtToken", login.data);
            console.log("redirect");
            this.setState({redirect: true})
            // this.props.history.push('/me');
        }
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to="/me" />
        }
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