import React, { Component } from 'react';
// import 'bulma/css/bulma.css';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="https://bulma.io">
                            <img src="http://logodust.com/img/free/logo46.png" />
                        </a>

                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-start">
                            <a href href="/" class="navbar-item">Home</a>
                            <a href href="me" class="navbar-item">Me</a>
                            <a href class="navbar-item">Reports</a>

                            <div class="navbar-item has-dropdown is-hoverable">
                                <a class="navbar-link">
                                    More
                                </a>

                                <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    Kmom01
                                </a>
                                <a class="navbar-item">
                                    Kmom02
                                </a>
                                <a class="navbar-item">
                                    Kmom03
                                </a>
                                <a class="navbar-item">
                                    Kmom04
                                </a>
                                <a class="navbar-item">
                                    Kmom05
                                </a>
                                <a class="navbar-item">
                                    Kmom06
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a class="button is-danger">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;