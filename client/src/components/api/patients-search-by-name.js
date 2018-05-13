fetchPatient(input) {
  const name = input;
  const encodedURI = encodeURI(`/api/patients/${name}`);

  let list = null;

  console.log('--Patient name received: ', name);

  fetch(encodedURI)
    .then((body) => body.json())
    .then((data) => {
      list = data;
      console.log('Patients search-search-by-name data: ', list);
    })
    .catch((error) => {
      console.warn(error)
      return null
    });
};
