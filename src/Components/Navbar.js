import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img alt="Logo" src="http://logodust.com/img/free/logo46.png" />
                        </a>

                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        </a>
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">Home</Link>
                            <Link to="/me" className="navbar-item">Me</Link>
                            <Link to="/new-report" className="navbar-item">Create report</Link>

                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    Reports
                                </a>

                                <div className="navbar-dropdown">
                                <Link to="/reports/kmom01" className="navbar-item">
                                    Kmom01
                                </Link>
                                <Link to="/reports/kmom02" className="navbar-item">
                                    Kmom02
                                </Link>
                                <Link to="/reports/kmom03" className="navbar-item">
                                    Kmom03
                                </Link>
                                <Link to="/reports/kmom04" className="navbar-item">
                                    Kmom04
                                </Link>
                                <Link to="/reports/kmom05" className="navbar-item">
                                    Kmom05
                                </Link>
                                <Link to="/reports/kmom06" className="navbar-item">
                                    Kmom06
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-danger">
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