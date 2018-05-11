const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/patients', (req, res) => {
  res.send({ patients: 'Our list of patients.' });
});

app.listen(port, () => console.log(`Patients server listening on port ${port}.`));
