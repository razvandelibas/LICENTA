import axios from "axios";

const token = localStorage.getItem('user');


const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, X-Auth-Token",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Authorization": `Bearer ${token}`,
};
const defaultConfig = {
  baseURL: "http://localhost:3000",
  headers: defaultHeaders,
};

const getAxiosInstance = () => {
  return axios.create(defaultConfig);
};
export default getAxiosInstance;

//configureze headerele pentru requesturi si seteaza default url ul 
//cu el se fac request urile la server
//se ia jwt-ul de unde e stocat si se pune pentru headerul de authorization