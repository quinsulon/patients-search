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
  "For example, 'http://localhost:5001/full_name'. " +
  "To return all the records of patients, access the root '/' endpoint. " +
  "For example, 'http://localhost:5001/'. "
}

app.get('/api/patients', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.send( [{ patients: 'Our list of patients.' }] );
});

app.get('/api/patients/:name', (req, res) => {
  res.header(header);
  res.send( [{ patients: 'Our list of patients: ' + req.params.name }] );
});

app.get('/api', (req, res) => {
  res.header(header);
  res.send(projectDescription);
});

app.listen(port, () => console.log(`Patients server listening on port ${port}.`));

// Would normally have two error catch-all handling functions here but skipping for time.
