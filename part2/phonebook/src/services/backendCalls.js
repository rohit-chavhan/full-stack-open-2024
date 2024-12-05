import axios from 'axios';
const baseUrl = 'api/persons';

const requestCall = (res) => res.then((response) => response.data);

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return requestCall(request);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return requestCall(request);
};

const deleteContact = (id) => axios.delete(`${baseUrl}/${id}`);

const updateContact = (newObj) => {
  const request = axios.put(`${baseUrl}/${newObj.id}`, newObj);
  return requestCall(request);
};

export default { create, getAll, deleteContact, updateContact };
