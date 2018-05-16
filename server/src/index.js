const patients = require('../data/patients.json');

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const header = {
  'Access-Control-Allow-Origin': 'http://localhost:5001',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const projectDescription = { 'project_description':
  "This project returns a list of patients that match " +
  "the string entered at the '/name' endpoint. " +
  "Ex. 'http://localhost:5000/A Patient' " +
  "To return all the records of patients, access the root '/' endpoint. " +
  "Ex. 'http://localhost:5000/' " +
  "To return a patient record by mrn, access http://localhost:5000/patients/mrn/MRNnnnn." +
  "Ex. 'http://localhost:5000/patients/mrn/MRN000000' "
}

app.get('/patients', (req, res) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:5001');
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header(header);
  // res.send( [{ patients: 'Our list of patients.' }] );
  res.send(patients);
});

app.get('/patients/:name', (req, res) => {
  res.header(header);

  const name = req.params.name;

  // console.log('server: patient name: ', name);
  // console.log('server: patients db: ', patients);

  // Would normally split on the name to get first and last name, etc and then
  // search on each. Searching each name for just whole input due to time.
  // let patientsFoundByFullname = patients.filter( (name) => {
  let results = patients.filter( (patient) => {
     if (patient.full_name === name || patient.first === name || patient.last === name) {
       return true;
     }
     return false;
     // console.log('server: checking patient record: ', patient.full_name);
  });

  res.send(results);
  // res.send( [{ patients: 'Our list of patients: ' + req.params.name }] );
});

// Assuming mrn is unique, not one-to-many mrn-to-persons.
// However, will allow the case to happen due to time. May check later.
app.get('/patients/mrn/:mrn', (req, res) => {
  res.header(header);

  // Scanned patient data, checking that mrn is valid: starts 'MRN' followed by numbers.
  // This check should be at the server, but also client so the user can see error msg.
  // Don't want to assume exact size of MRN for now.
  let mrn = req.params.mrn;
  if (!(/^MRN/.test(mrn)) || !/\d$/.test(mrn)) {
    res.send({'error': 'MRN should be in the format MRNnnnn'});
    return;
  };

  let results = patients.filter( (patient) => patient.mrn === mrn);

  res.send(results);
  // res.send( [{ patients: 'Our list of patients: ' + req.params.name }] );
});

app.get('/', (req, res) => {
  res.header(header);
  res.send(projectDescription);
});

app.listen(port, () => console.log(`Patients server listening on port ${port}.`));

// Would normally have two error catch-all handling functions here but skipping for time.
