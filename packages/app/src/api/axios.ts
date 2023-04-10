import axios from 'axios';

const BASE_URL = 'http://localhost:4040';
console.log('BASE_URL', BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
});
