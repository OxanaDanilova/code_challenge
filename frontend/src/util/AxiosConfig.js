import axios from "axios";
import baseURL from "./constans";

const axiosInstance = axios.create({
  baseURL: baseURL,
  /* withCredentials: true, */
});

export default axiosInstance;