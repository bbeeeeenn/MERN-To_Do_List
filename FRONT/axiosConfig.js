import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.BACKEND_BASEURL || "http://localhost:3000";
