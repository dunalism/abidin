import axios from "axios";
import baseURL from "./baseUrl";

export const axiosInstance = axios.create({
  baseURL: baseURL,
});
