import React, { Component } from 'react';
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    

    onChange = e => this.setState({[e.target.name]: e.target.value});

    async onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        console.log('this.state: ', this.state);
        const newUser = await axios.post(`${process.env.REACT_APP_API_URL}/register/`, {
            'email': email,
            'password': password
        });
        console.log('newUser: ', newUser);
        
    }

    render() {
        return (
            <div className="container">
                <div className="columns is-centered">
                    <form onSubmit={this.onSubmit} method="post">
                        <div className="column">
                            <div className="field">
                                <label className="label" htmlFor="email">Email</label>
                                <div className="control">
                                    <input onChange={this.onChange} className="input" type="text" name="email" />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="field">
                                <label className="label" htmlFor="password">Password</label>
                                <div className="control">
                                    <input onChange={this.onChange} className="input" type="text" name="password" />
                                </div>
                            </div>
                        </div>
                        <button className="button is-danger" type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
