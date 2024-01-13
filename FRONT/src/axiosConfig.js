import axios from "axios";

const prod = import.meta.env.PROD;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = !prod
	? import.meta.env.VITE_SERVER_BASE_URL_LOCAL
	: VITE_SERVER_BASE_URL_PROD;
