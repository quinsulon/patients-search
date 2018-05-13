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
        <div className='App'>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" /> <br />
            <Link to='/'>Home</Link><br />
            <Link to='/search-patients'>Patients Search</Link>
          </header>
          <Route exact path='/' component={Home} />
          <Route path='/search-patients' component={Patients} />
          <Route path='/patients' component={Patients} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
