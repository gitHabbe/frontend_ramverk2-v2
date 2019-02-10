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
        // console.log("submitted")
        // const login = await axios.post("https://me-api.nhallberg.me/login/", {
        console.log("loggin in");
        try {
            const login = await axios.post("https://me-api.nhallberg.me/login", {
                'email': email,
                'password': password
            });
            localStorage.setItem("jwtToken", login.data.token);
            this.props.setUser();
            this.setState({redirect: true});
        } catch (error) {
			// console.log('TCL: }catch -> error', error)
            this.setState({redirect: false});
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