import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import 'bulma/css/bulma.css';
import './App.css';

import Navbar from "./Components/Navbar.js";
import Home from "./Components/Home.js";
import Me from "./Components/Me.js";
import Report from "./Components/Report.js";
import NewReport from "./Components/NewReport.js";
import Register from "./Components/Register.js";
import Login from "./Components/Login.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/"         component={Home}/>
          <Route path="/me"             component={Me}/>
          <Route path="/new-report"     component={NewReport}/>
          <Route path="/reports/:num"   component={Report}/>
          <Route path="/register"       component={Register}/>
          <Route path="/login"          component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
