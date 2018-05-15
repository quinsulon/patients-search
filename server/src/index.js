const patients = require('../data/patients.json');

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const header = {
  'Access-Control-Allow-Origin': 'http://localhost:5001',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const projectDescription = { 'project-description':
  "This project returns a list of patients that match " +
  "the string entered at the '/full_name' endpoint. " +
  "Ex. 'http://localhost:5000/full_name'. " +
  "To return all the records of patients, access the root '/' endpoint. " +
  "Ex. 'http://localhost:5000/'. "
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
  // res.send( [{ patients: 'Our list of patients: ' + req.params.name }] );
  const name = req.params.name;
  console.log('server: patient name: ', name);
  console.log('server: patients db: ', patients);

  // Would normally split on the name to get first and last name, etc and then
  // search on each. Searching each name for just whole input due to time.
  // let patientsFoundByFullname = patients.filter( (name) => {
  let results = patients.filter( (patient) => {
     patients.full_name === name || patients.first === name || patients.last === name
  });

  // let patientsFoundByFirstname = patients.filter( (name) => patients.first === name);
  // let patientsFoundByLastname = patients.filter( (name) => patients.last === name);
  // let results = [];
  //
  // if (patientsFoundByFullname) {
  //   results = patientsFoundByFullname
  //     .concat(patientsFoundByFirstname)
  //     .concat(patientsFoundByLastname);
  // } else if (patientsFoundByFirstname) {
  //   let results = patientsFoundByFirstname.concat(patientsFoundBylastname);
  // } else if (patientsFoundByLastname) {
  //   let results = patientsFoundByLastname;
  // }

  res.send(results);
});

// Assuming mrn is unique, not one-to-many mrn-to-persons.
// However, will allow the case to happen due to time. May check later.
app.get('/patients/mrn/:mrn', (req, res) => {
  res.header(header);
  // res.send( [{ patients: 'Our list of patients: ' + req.params.name }] );
  const name = req.params.name;

  let patientByMrn = patients.filter( (mrn) => patients.mrn === mrn);

  res.send(patientByMrn);
});

app.get('/', (req, res) => {
  res.header(header);
  res.send(projectDescription);
});

app.listen(port, () => console.log(`Patients server listening on port ${port}.`));

// Would normally have two error catch-all handling functions here but skipping for time.
