import React from 'react';

export default function Home () {
  return (
    <div className="App">
      <h1 className="App-title">About</h1>
        This project returns a list of patients that match the string entered at the '/patients/full name' endpoint. <br />
        Ex. 'http://localhost:5001/patients/Marna Wanke' <br />
        <br />
        To return all the records of patients, access the root '/' endpoint. <br />
        Ex. 'http://localhost:5001/'
    </div>
  );
}
