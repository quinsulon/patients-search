import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom';

// import './api/patients-list.js';

// let list = [];

function GetPatients (props) {
  console.log('-- GetPatients Func Component --');
  let name = '';
  if (props == null) {
    name = props.match.params.name;
  } else {
    name = '';
  }
  // let list = [];

  const encodedURI = encodeURI(`/patients/${name}`);

    fetch(encodedURI)
      .then((body) => body.json())
      .then((data) => {
        props.send(data);
        console.log('Patient list: ', data);
        return (
          <div>TEST</div>
        )
      })
      .catch((error) => {
        console.warn(error)
        return null;
      });

  return null;
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
    this.fromGetPatient = this.fromGetPatient.bind(this);
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

    const encodedURI = encodeURI(`/patients/${name}`);

    fetch(encodedURI)
      .then((body) => body.json())
      .then((data) => {
        this.setState({
          loading: false,
          patients: data,
          input: ''
        })
        console.log('Patients: ', this.state.patients);
      })
      .catch((error) => {
        console.warn(error)
        return null
      });

  }

  fromGetPatient(patients) {
    this.setState({ loading:false, patients });
  }

  componentDidUpdate() {

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

        <Route path='/patients/:name' render={ () => {
          return <GetPatients send={this.fromGetPatient} />
        }} />
        <Route exact path='/patients' render={ () => {
          return <GetPatients send={this.fromGetPatient} />
        }} />

      </div>
    )
  }
}

// export default Patients;
