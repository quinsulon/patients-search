import React, { Component } from 'react';
import {
  BrowserRouter,
  Link,
  Route
} from 'react-router-dom';

import Home from './Home';
import Patients from './Patients';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/patients'>Patients Search</Link></li>
          </ul>
        </header>
        <div className='App'>
          <Route exact path='/' component={Home} />
          <Route path='/patients' component={Patients} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
