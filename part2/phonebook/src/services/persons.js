import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getPersons = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const addPerson = (personObject) => {
  const request = axios.post(baseURL, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const updateNumber = (id, newPerson) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson);
  return request.then((response) => response.data);
};

export default {
  getPersons,
  addPerson,
  deletePerson,
  updateNumber,
};
