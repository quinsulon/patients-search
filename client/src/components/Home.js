import React from 'react';

import './App.css';

export default function Home () {
  return (
    <div className="App">
      <h1 className="App-title">About</h1>
        This project returns a list of patients that match the string entered at the '/patients/full name' endpoint. <br />
        Ex. 'http://localhost:5000/patients/Marna Wanke' <br />
        <br />
        To return all the records of patients, access the root '/' endpoint. <br />
        Ex. 'http://localhost:5000/' <br />
        <br />
        To return a patient record by MRN, access '/patiens/mrn/MRNnnnn' <br />
        Ex. 'http://localhost:5000/patients/mrn/MRN000000' <br />
        <br />
        Or, navigate to the patient search form by following 'Patients Search' above.
    </div>
  );
}
