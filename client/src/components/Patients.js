import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom';

// import './api/patients-list.js';

let list = [];

function GetPatients ({ match }) {
  console.log('-- GetPatients Func Component --');
  let name = match.params.name;
  // let list = [];

  if (name === undefined) {
    name = '';
  }

  const encodedURI = encodeURI(`/api/patients/${name}`);

    fetch(encodedURI)
      .then((body) => body.json())
      .then((data) => {
        list = data;
        console.log('Patient list: ', list);
      })
      .catch((error) => {
        console.warn(error)
        return null;
      });

  return (
    <div>
      {list.map( (record) => (
          <span key={record.patients}>{record.patients}</span>
        ))}
    </div>
  );
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
    console.log('Patients - input', value);
  }

  fetchPatient() {
    const name = this.state.input;

    this.setState({
      loading: true
    })
    // if(name === '') {
    //
    // }
    console.log('--Patient name received: ', name);

    const encodedURI = encodeURI(`/api/patients/${name}`);

    fetch(encodedURI)
      .then((body) => body.json())
      .then((data) => {
        this.setState({
          loading: false,
          patients: data
        })
        console.log('Patients: ', this.state.patients);
      })
      .catch((error) => {
        console.warn(error)
        return null
      });

  }

  render() {
    return (
      <div>
        <br />
        <Route exact path='/search-patients' render={ () => {
          return (
            <div>
              <input
                    type="text"
                    placeholder="Enter Patient's name"
                    value={this.state.input}
                    onChange={this.updateInput}
              />
              <button onClick={this.fetchPatient}>Submit</button>
              <h3>
                <span>Please enter the name of the patient you wish to find and click "Submit".</span><br />
                <span>Or, simply click "Submit" to return a list of all patients.</span>
              </h3>
            </div>
          )
        }} />

        <Route path='/patients/:name' component={GetPatients} />
        <Route exact path='/patients' component={GetPatients} />

      </div>
    )
  }
}

// export default Patients;
