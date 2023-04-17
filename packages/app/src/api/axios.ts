import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// console.log('import.meta.env', import.meta.env);
// console.log('BASE_URL', BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
});
