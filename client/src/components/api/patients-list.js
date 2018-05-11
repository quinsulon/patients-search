fetchPatientsList() {
  const encodedURI = encodeURI(`/api/patients`)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error)
      return null
    });
};
