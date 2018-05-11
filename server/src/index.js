const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/patients', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.send({ patients: 'Our list of patients.' });
});

app.listen(port, () => console.log(`Patients server listening on port ${port}.`));
