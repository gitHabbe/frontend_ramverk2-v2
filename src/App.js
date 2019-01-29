import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import Navbar from "./Components/Navbar.js";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar />
      </div>
    );
  }
}

export default App;
