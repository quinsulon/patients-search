import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom';

// import Loading from './Loading';

// import './api/patients-list.js';

// Not using destructuring for ease of understanding over readability.
class Patients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      input: '',
      mrn: '',
      loading: 'false'
    };

    this.updateName = this.updateName.bind(this);
    this.updateMrn = this.updateMrn.bind(this);
    this.fetchPatient = this.fetchPatient.bind(this);
    this.fetchPatientByMrn = this.fetchPatientByMrn.bind(this);
    this.fromGetPatient = this.fromGetPatient.bind(this);
    console.log('--constructor--');
  }

  updateName(e) {
    const value = e.target.value

    this.setState({
      input: value
    });
    console.log('Patients - input', value);
  }

  updateMrn(e) {
    const value = e.target.value

    this.setState({
      mrn: value
    });
    console.log('Patients - mrn', value);
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

  fetchPatientByMrn() {
    const mrn = this.state.mrn;

    this.setState({
      loading: true
    })
    // if(name === '') {
    //
    // }
    console.log('--Patient mrn received: ', mrn);

    const encodedURI = encodeURI(`/patients/mrn/${mrn}`);

    fetch(encodedURI)
      .then((body) => body.json())
      .then((data) => {
        this.setState({
          loading: false,
          patients: data,
          mrn: ''
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

  componentDidMount() {
    console.log('Patient Class mounted.');
  }

  componentDidUpdate() {
    console.log('Patient Class updated.');
  }

  componentWillUnmount() {
    console.log('Patient Class will remove loading interval.');
  }

  render() {
    return (
      <div>
        <br />
        <Route exact path='/search-patients' render={ () => {
          return (
            <div>
              <div>
              <input
                    type="text"
                    placeholder="Enter Patient's name"
                    value={this.state.input}
                    onChange={this.updateName}
              />
              <button onClick={this.fetchPatient}>Submit</button>
              </div>
              <div>
              <input
                    type="text"
                    placeholder="Enter Patient's MRN"
                    value={this.state.mrn}
                    onChange={this.updateMrn}
              />
              <button onClick={this.fetchPatientByMrn}>Submit</button>
              </div>
              <h3>
                <span>Please enter the name of the patient you wish to find and click "Submit".</span><br />
                <span>Or, simply click "Submit" to return a list of all patients.</span>
              </h3>
              <br />
              <ul style={{display: 'flex', flexWrap: 'wrap'}}>
                {this.state.patients.map( (patient) => (
                  <li key={patient.id} style={{margin: 30}}>
                    <ul>
                      <li><label>Patient Id: </label><span>{patient.id}</span></li>
                      <li><label>Patient Name: </label><span>{patient.full_name}</span></li>
                      <li><label>MRN: </label><span>{patient.mrn}</span></li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )
        }} />

      </div>
    )
  }
}

export default Patients;

// class GetPatients extends Component () {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       patients: [],
//       input: '',
//       loading: false // Wont' get a chance to implement the loading component.
//     };
//   }
//
//   // console.log('-- GetPatients Func Component --');
//   // let name = '';
//   // if (props == null) {
//   //   name = props.match.params.name;
//   // } else {
//   //   name = '';
//   // }
//   // // let list = [];
//   //
//   // const encodedURI = encodeURI(`/patients/${name}`);
//   //
//   //   fetch(encodedURI)
//   //     .then((body) => body.json())
//   //     .then((data) => {
//   //       props.send(data);
//   //       console.log('Patient list: ', data);
//   //       return (
//   //         <div>TEST</div>
//   //       )
//   //     })
//   //     .catch((error) => {
//   //       console.warn(error)
//   //       return null;
//   //     });
//
//   render () {
//     return <div>Proxying not implemented.</div>;
//   }
// }
