import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.css';
import './App.css';

import Navbar from "./Components/Navbar.js";
import Home from "./Components/Home.js";
import Me from "./Components/Me.js";
import Report from "./Components/Report.js";
import NewReport from "./Components/NewReport.js";
import Register from "./Components/Register.js";
import Login from "./Components/Login.js";
require('dotenv').load();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
    
    this.setUser = this.setUser.bind(this);
  }
  
  async componentDidMount() {
    console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL);
    try {
      const user = await axios.get(`${process.env.REACT_APP_API_URL}/jwt_outh`,
      {
        headers: {
          'x-access-token': localStorage.getItem("jwtToken")
        }
      });
      console.log('user: ', user);
      this.setState({isLoggedIn: true})
      
    } catch (error) {
			console.log('TCL: App -> }catch -> error', error)
      
    }
  }
  
  async setUser() {
    try {
      const user = await axios.get(`${process.env.REACT_APP_API_URL}/jwt_outh`,
      {
        headers: {
          'x-access-token': localStorage.getItem("jwtToken")
        }
      });
      console.log('user: ', user);
      this.setState({isLoggedIn: true, user});
      
    } catch (error) {
			console.log('TCL: App -> }catch -> error', error)
      
    }

  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar isLoggedIn={this.state.isLoggedIn}/>
          <Route exact path="/"         component={Home}/>
          <Route path="/me"             component={Me}/>
          <Route path="/new-report"     component={NewReport}/>
          <Route path="/reports/:num"   component={Report}/>
          <Route path="/register"       component={Register}/>
          <Route path="/login"          render={props => <Login {...props} setUser={this.setUser}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
