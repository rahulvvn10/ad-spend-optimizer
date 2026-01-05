import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000"
});

export const analyzeWhatIf = (data) =>
  API.post("/analyze", data);

export const fetchStrategies = (data) =>
  API.post("/strategies", data);
