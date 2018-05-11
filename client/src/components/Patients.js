import React, { Component } from 'react';
import {
  Link,
  Route
} from 'react-router-dom';

// import './api/patients-list.js';

// Not using destructuring for ease of understanding over readability.
export default class Patients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: '',
      input: '',
      loading: 'true'
    };
  }

  fetchPatientsList() {
    const encodedURI = encodeURI(`/api/patients`);

    return fetch(encodedURI)
      .then((data) => data.json())
      .catch((error) => {
        console.warn(error)
        return null
      });
  }

  render() {
    return (
      <div>
        This will be the list of all patients.

        <Route exact path={this.props.match.path} render={ () => {
          return (
            <h3>Please enter the name the patient you wish to find and click the 'find' button.</h3>
          )
        }} />
      </div>
    )
  }
}

// export default Patients;
