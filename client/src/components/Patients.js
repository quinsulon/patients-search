import React, { Component } from 'react';
import {
  Link,
  Route
} from 'react-router-dom';

// import './api/patients-list.js';

function Patient ({ props }) {
  console.log('-- Patient Func Component --');
  return <h2>{props.match.params.name}</h2>
}

// Not using destructuring for ease of understanding over readability.
export default class Patients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      input: '',
      loading: 'true'
    };

    this.updateInput = this.updateInput.bind(this);
    this.fetchPatient = this.fetchPatient.bind(this);
    console.log('--constructor--');
  }

  updateInput(e) {
    const value = e.target.value

    this.setState({
      input: value
    });
  }

  fetchPatient(name) {
    this.setState({
      loading: true
    })
    // if(name === '') {
    //
    // }
    console.log('--Patients received: ', name);

    const encodedURI = encodeURI(`/api/patients`);

    fetch(encodedURI)
      .then((body) => body.json())
      .then((data) => {
        this.setState({
          loading: false,
          patients: data
        })
        console.log('data: ', data);
      })
      .catch((error) => {
        console.warn(error)
        return null
      });

      console.log('--Patients fetch done: ', this.state.patients);
  }

  render() {
    return (
      <div>
        <br />
        <input
              type="text"
              placeholder="Enter Patient's name"
              value={this.state.input}
              onChange={this.updateInput}
        />
        <button onClick={this.fetchPatient}>Submit</button>

        <Route exact path={this.props.match.path} render={ () => {
          return (
            <div>
              <h3>
                <span>Please enter the name of the patient you wish to find and click 'Submit'.</span><br />
                <span>Or, simply click 'Submit' to return a list of all patients.</span>
              </h3>
            </div>
          )
        }} />
        <Route path={`${this.props.match.path}/:name`} component={Patient} />
      </div>
    )
  }
}

// export default Patients;
