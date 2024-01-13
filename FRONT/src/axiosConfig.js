import axios from "axios";

const prod = import.meta.env.PROD;
const localBaseUrl = import.meta.env.VITE_SERVER_BASE_URL_LOCAL;
const productionBaseUrl = import.meta.env.VITE_SERVER_BASE_URL_PROD;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = !prod ? localBaseUrl : productionBaseUrl;
